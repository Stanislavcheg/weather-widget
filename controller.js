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
	$scope.user = {};
	$scope.user.sex = 'Male';
	$scope.user.hobbies = {
	  	hob1: true,
		hob2: false,
	 	hob3: false
	};
	$scope.max = 10;
	$scope.dynamic = 0;
	$scope.$watch('frm.$valid', function (n) {
		$scope.type = n ? 'success' : 'danger';
	});
	// $scope.$watch('frm', function (n) {
	// 	$scope.type = n.name ? 'success' : 'danger';
	// }, true);

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

	$scope.checkResults = [];

	$scope.$watchCollection('user.hobbies', function () {
		$scope.checkResults = [];
	   	angular.forEach($scope.user.hobbies, function (value, key) {
	   		if (value) {
	       		$scope.checkResults.push(key);
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