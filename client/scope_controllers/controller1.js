myAppModule.controller('usersController', function($scope, $location, userFactory)
{
	$scope.errors = [];
	userFactory.getUsers(function(data){
		$scope.users = data;
	});

	$scope.addUser = function()
	{
		userFactory.addUser($scope.newUser, function(data)
		{
			if(data.error)
			{
				$scope.success = '';
				$scope.errors = data;
			}
			else
			{
				$scope.errors = '';
				$scope.success = "User has been successfully added to the database";
				$scope.users = data;
			}
				$scope.newUser = {};
		})
	}

	$scope.removeUser = function(user)
	{
		userFactory.removeUser(user, function(data)
		{
			$scope.users = data;
		})
	}

})