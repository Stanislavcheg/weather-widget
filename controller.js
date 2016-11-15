var app = angular.module('app', ['ngResource', 'ngRoute', 'ui.bootstrap']);


app.config(function($routeProvider){
	$routeProvider
	.when("/", {
		redirectTo : "/one" 
	})
	.when("/one", {
		templateUrl : "weather.html",
		controller: "weatherCtrl" 
	})
	.when("/two", {
		templateUrl : "temp2.html",
		controller: "FormCtrl"
	})
	.otherwise({
		redirectTo : "/one" 
	})
});

app.controller('FormCtrl', function ($scope) {
	$scope.hobbies = {
	  		hob1: false,
			hob2: false,
	 		hob3: false
	};

	$scope.max = 0;
	$scope.dynamic = 1;
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
	
	$scope.$watch('frm.$valid', function (n) {
		$scope.type = n ? 'primary' : 'danger';
	});

	for (prop in $scope.user) {
		$scope.max++;	
		$scope.$watch("user."+ prop, function (n,o) {
		 	if(n && !o) $scope.dynamic++;
		 	else if (!n && o) $scope.dynamic--;
		 });
	}

	$scope.$watch("user.hobs", function (n,o) {
		 	if(n.length && !o.length) $scope.dynamic++;
		 	else if (!n.length && o.length) $scope.dynamic--;
		 	console.log(n.length, "len");
	});
	
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
	   	angular.forEach($scope.hobbies, function (value, key) {
	   		if (value) {
	       		$scope.user.hobs.push(key);
	   		}
	   	});
	});

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

app.factory('weatherResource', function ($resource) {
	var api_key = '6e3fcb812a6ea26bfbb60bacee7afa6f',
		path = 'http://api.openweathermap.org/data/2.5/weather?q=:city&units=metric&appid=' + api_key;
	return $resource(path);
});

app.factory('weatherForecastResource', function ($resource) {
	var api_key = '6e3fcb812a6ea26bfbb60bacee7afa6f',
		path = 'http://api.openweathermap.org/data/2.5/forecast?q=:city,country&units=metric&appid=' + api_key;
	return $resource(path);
});