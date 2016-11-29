app.controller('dragDropCtrl', function dragDropCtrl($scope,employeeList) {
	$scope.employeeList = employeeList;
	$scope.bucketList = [];
	$scope.list2 = {};
	$scope.addBucket = function() {
		$scope.bucketList.push($scope.bucketName);
		$scope.bucketName = "";
	}
});

