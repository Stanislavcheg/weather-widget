var app = angular.module('app', ['ngResource', 'ngRoute', 'ui.bootstrap']);

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
		controller: "FormCtrl"
	})
	.otherwise({
		redirectTo : "/one" 
	})
});