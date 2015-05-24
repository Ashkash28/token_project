myAppModule.controller('profileController', function($scope, $location, $routeParams, userFactory)
{	
	userFactory.getOneUser($routeParams.id, function(data){
		$scope.user = data;
	})

	$scope.updateUser = function(){

		userFactory.updateUser($routeParams.id, $scope.changeUser, function(data)
		{})

		userFactory.getOneUser($routeParams.id, function(data){
			$scope.user = data;
		})

		$scope.changeUser = {};
	}
})