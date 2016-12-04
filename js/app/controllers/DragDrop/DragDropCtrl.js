app.controller('dragDropCtrl', function dragDropCtrl($scope,employeeList) {
	$scope.employeeList = employeeList;
	$scope.bucketList = [];

	$scope.addBucket = function() {

		$scope.bucketList.push({name: $scope.bucketName, items: []});
		$scope.bucketName = "";
	}
	$scope.removeBucket = function(index) {
		var len = $scope.bucketList[index].items.length;
		var items = $scope.bucketList[index].items;
		for (var i = 0; i <len; i++) {
			$scope.employeeList.push(items[i]);
		}
		$scope.bucketList.splice(index, 1);
	}
});

