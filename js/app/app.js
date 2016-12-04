var app = angular.module('app', ['ngResource', 'ngRoute', 'ui.bootstrap', 'dndLists']);

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