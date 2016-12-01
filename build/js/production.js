var app = angular.module('app', ['ngResource', 'ngRoute', 'ui.bootstrap', 'ngDragDrop']);

app.config(function($routeProvider){
	$routeProvider
	.when("/", {
		redirectTo : "/one" 
	})
	.when("/one", {
		templateUrl : "templates/weather.html",
		controller: "weatherCtrl" 
	})
	.when("/two", {
		templateUrl : "templates/temp2.html",
		controller: "formCtrl"
	})
	.when("/three", {
		templateUrl : "templates/temp3.html",
		controller: "dragDropCtrl"
	})

	.otherwise({
		redirectTo : "/one" 
	})
});
app.controller('dragDropCtrl', function dragDropCtrl($scope,employeeList) {
	$scope.employeeList = employeeList;
	$scope.bucketList = [];

	$scope.addBucket = function() {

		$scope.bucketList.push({name: $scope.bucketName, items: []});
		$scope.bucketName = "";
	}
	$scope.removeBucket = function(index) {
		var bucketArr = [];
		var defaultArr = [];
		angular.copy($scope.bucketList[index].items, bucketArr);
		angular.copy($scope.employeeList, defaultArr);
		$scope.bucketList.splice(index, 1);
		defaultArr = defaultArr.concat(bucketArr);
		$scope.employeeList = defaultArr;

	}
});


app.controller('formCtrl', function ($scope) {
	$scope.hobbies = {
	  		hob1: false,
			hob2: false,
	 		hob3: false
	};
	$scope.user = {
		name:'',
		lastName:'',
		email:'',
		sex:'male',
		hobs: [],
		dateBirth:'',
		address:'',
		weight:'',
		occupation:'',
		description:'',
	};
	$scope.dynamic = 1;
	$scope.max = Object.keys($scope.user).length;
	$scope.$watch('frm.$valid', function (n) {
		$scope.type = n ? 'primary' : 'danger';
	});

	for (prop in $scope.user) {	
		$scope.$watch("user."+ prop, function (n,o) {
			console.log('prop2', prop, n, typeof n);
			if (Array.isArray(n) && n.length && !o.length || n && !o) {
				$scope.dynamic++
			} else if (Array.isArray(n) && !n.length && o.length || !n && o){
				$scope.dynamic--
			}
		});
	}

	$scope.dateOptions = {
	 	formatYear: 'yy',
	    maxDate: new Date(),
	    minDate: new Date(1900,0,1),
	    startingDay: 1
	};

	$scope.open = function() {
	    $scope.popup.opened = true;
	};

	$scope.popup = {
	   	opened: false
	};

 	$scope.$watchCollection('hobbies', function () {
		$scope.user.hobs = [];
 	   	angular.forEach($scope.hobbies, function (value, key) {
 	   		if (value) {
 	       		$scope.user.hobs.push(key);
 	   		}
 	   	});
 	});

 });

app.controller('weatherCtrl', function weatherCtrl($scope) {
		$scope.date = function(daysForward){
			var date = new Date();
			if (daysForward) {
			date.setDate(date.getDate() + daysForward);
			}
			return date;
		};

		$scope.weatherIcons = {
			"Rain" : "images/icons/icon-9.svg",
			"Clouds" : "images/icons/icon-3.svg",
			"Atmosphere" : "images/icons/icon-7.svg",
			"Thunderstorm" : "images/icons/icon-12.svg",
			"Drizzle" : "images/icons/icon-5.svg",
			"Snow" : "images/icons/icon-14.svg",
			"Clear" : "images/icons/icon-2.svg",
			"Extreme" : "images/icons/icon-8.svg",
			"Additional" : "images/icons/icon-3.svg"
		};

	$scope.search = function ($event) {
		if ($event) $event.preventDefault();
		$scope.input = $scope.city;
	}
});
app.directive('lowerCase', function(){
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function (scope, element, attrs, ctrl) {
   			ctrl.$parsers.push(function (value) {
   				if (value) {
   					return value.toLowerCase();
   				}
   			});
		}
	}
});
app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
 
                event.preventDefault();
            }
        });
    };
});
app.directive('validMinWords', function(){
	return {
		restrict: 'A',
		require: 'ngModel',
		scope: {
			validMinWords: '='
		},
		link: function (scope, element, attrs, ctrl) {
   			ctrl.$validators.minWords = function (value) {
    			return ctrl.$isEmpty(value) || value.split(' ').length >= scope.validMinWords;
   			};
		}
	}
});
app.directive('widget', function (weatherResource, weatherForecastResource) {
	return {
		restrict: 'E',
		link: function (scope, element) {
			scope.$watch('input', function (n) {
				if (n) {
					weatherResource.get({city: n}, function (response) {
						scope.data = response;
						weatherForecastResource.get({city: n, country:  scope.data.sys.country}, function (response) {
						scope.dataForc = response;
					});
					});
					
				}
			});
		}
	}
});
app.factory('employeeList', function () {
	return [{name:'Vasiliy', position: 'Developer'},{name:'Maria', position: 'Accounter'}, {name:'Andrew', position: 'QA'}, {name:'Ihor', position: 'Manager'}];
});
app.factory('weatherForecastResource', function ($resource) {
	var api_key = '6e3fcb812a6ea26bfbb60bacee7afa6f',
		path = 'http://api.openweathermap.org/data/2.5/forecast?q=:city,country&units=metric&appid=' + api_key;
	return $resource(path);
});
app.factory('weatherResource', function ($resource) {
	var api_key = '6e3fcb812a6ea26bfbb60bacee7afa6f',
		path = 'http://api.openweathermap.org/data/2.5/weather?q=:city&units=metric&appid=' + api_key;
	return $resource(path);
});