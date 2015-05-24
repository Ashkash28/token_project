myAppModule.controller('sessionsController', function($scope, $location, userFactory)
{
	$scope.errors = [];


	$scope.signIn = function()
	{
		console.log($scope.oldUser);
		userFactory.signIn($scope.oldUser, function(data)
		{
			if(data.error)
			{
				$scope.message = data;
			}
			else
			{
				$scope.message = '';
				$scope.users = data;
				$location.path('/main');
			}
				$scope.oldUser = {};
		})
	}


})