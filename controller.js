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
		controller: "ButtonsCtrl"
	})
	.otherwise({
		redirectTo : "/one" 
	})
});


app.service('UserService', function(){
	return {};
})

app.controller('FormCtrl', function ($scope, UserService) {
$scope.user = {};
$scope.isSubmited = false;

 // UserService.name = $scope.user.name;
 // UserService.lastName = $scope.user.lastName;
 // UserService.email = $scope.user.email;
 // UserService.address = $scope.user.address;
 // UserService.weight = $scope.user.weight;
 // UserService.occupation = $scope.user.occupation;
 // UserService.description = $scope.user.description;
$scope.user.sex = UserService.sex;
$scope.user.hobbies = UserService.hobbies;
$scope.user.dateBirth = UserService.dateBirth;

$scope.descCheck = function(desc){
	$scope.isValidDesc = desc.split(" ").length >= 20;
};

$scope.submit = function(){
$scope.isSubmited = true;
}

});


app.controller('ButtonsCtrl', function ($scope, UserService) {
	$scope.user = {};
	$scope.singleModel = 1;
	$scope.user.sex = 'Male';
	$scope.user.hobbies = {
    	hob1: true,
   		hob2: false,
   		hob3: false
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


	UserService.sex = $scope.user.sex;
	UserService.hobbies = $scope.checkResults;
});

app.controller('DatepickerCtrl', function ($scope, UserService) {
	$scope.user = {};
	$scope.dateOptions = {
   		formatYear: 'yy',
    	maxDate: new Date(),
    	minDate: new Date(1900,0,1),
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
  	UserService.dateBirth = $scope.user.dateBirth;
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