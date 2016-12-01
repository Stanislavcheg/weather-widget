app.controller('dragDropCtrl', function dragDropCtrl($scope,employeeList) {
	$scope.employeeList = employeeList;
	$scope.bucketList = [];

	$scope.addBucket = function() {

		$scope.bucketList.push({name: $scope.bucketName, items: []});
		$scope.bucketName = "";
	}
	$scope.removeBucket = function(index) {
		var bucketArr = [];
		var defaultArr = [];
		angular.copy($scope.bucketList[index].items, bucketArr);
		angular.copy($scope.employeeList, defaultArr);
		$scope.bucketList.splice(index, 1);
		defaultArr = defaultArr.concat(bucketArr);
		$scope.employeeList = defaultArr;

	}
});

