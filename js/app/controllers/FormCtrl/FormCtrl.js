app.controller('formCtrl', function ($scope) {
	$scope.hobbies = {
	  		hob1: false,
			hob2: false,
	 		hob3: false
	};
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
	$scope.dynamic = 1;
	$scope.max = Object.keys($scope.user).length;
	$scope.$watch('frm.$valid', function (n) {
		$scope.type = n ? 'primary' : 'danger';
	});

	for (prop in $scope.user) {	
		$scope.$watch("user."+ prop, function (n,o) {
			console.log('prop2', prop, n, typeof n);
			if (Array.isArray(n) && n.length && !o.length || n && !o) {
				$scope.dynamic++
			} else if (Array.isArray(n) && !n.length && o.length || !n && o){
				$scope.dynamic--
			}
		});
	}

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
		$scope.user.hobs = [];
 	   	angular.forEach($scope.hobbies, function (value, key) {
 	   		if (value) {
 	       		$scope.user.hobs.push(key);
 	   		}
 	   	});
 	});

 });
