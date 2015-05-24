myAppModule.controller('tokensController', function($scope, $location, $routeParams, userFactory)
{
	userFactory.getOneUser($routeParams.id, function(data){
		$scope.user = data;
	})

	$scope.addToken = function(user)
	{
		userFactory.addToken(user, function(data)
		{})
		
		userFactory.getOneUser($routeParams.id, function(data){
			$scope.user = data;
		})
	}

	$scope.removeToken = function(user, token)
	{
		userFactory.removeToken(user._id, token, function(data)
		{})

		userFactory.getOneUser($routeParams.id, function(data){
			$scope.user = data;
		})
	}

})