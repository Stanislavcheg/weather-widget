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