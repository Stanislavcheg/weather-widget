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