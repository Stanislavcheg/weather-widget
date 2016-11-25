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