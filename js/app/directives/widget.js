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