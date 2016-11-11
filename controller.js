var weather = angular.module('weather', ['ngResource', 'ngRoute', 'ui.bootstrap']);

weather.config(function($routeProvider){
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
		controller: "ButtonsCtrl"
	})
	.otherwise({
		redirectTo : "/one" 
	})
});

weather.controller('TimepickerDemoCtrl', function ($scope, $log) {

});

weather.controller('ButtonsCtrl', function ($scope) {
  $scope.singleModel = 1;
  $scope.radioModel = 'Left';
  $scope.checkModel = {
    left: true,
    right: false
  };
})
 function disabled(data) {
    var date = data.date,
      mode = data.mode;
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  }
weather.controller('DatepickerCtrl', function ($scope) {
 $scope.dateOptions = {
    dateDisabled: disabled,
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(),
    startingDay: 1
  };

   $scope.open = function() {
    $scope.popup.opened = true;
  };

  $scope.setDate = function(year, month, day) {
    $scope.dt = new Date(year, month, day);
  };

 	$scope.popup = {
    opened: false
  };

  }
 );



weather.controller('weatherCtrl', function weatherCtrl($scope) {
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


weather.directive('ngEnter', function () {
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

weather.directive('widget', function (weatherResource, weatherForecastResource) {
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

weather.factory('weatherResource', function ($resource) {
	var api_key = '6e3fcb812a6ea26bfbb60bacee7afa6f',
		path = 'http://api.openweathermap.org/data/2.5/weather?q=:city&units=metric&appid=' + api_key;
	return $resource(path);
});

weather.factory('weatherForecastResource', function ($resource) {
	var api_key = '6e3fcb812a6ea26bfbb60bacee7afa6f',
		path = 'http://api.openweathermap.org/data/2.5/forecast?q=:city,country&units=metric&appid=' + api_key;
	return $resource(path);
});