myAppModule.factory('userFactory', function($http){
	var users = [];
	var factory = {};

	factory.getUsers = function(callback){

		$http.get("/users").success(function(response)
		{
			users = response;
			callback(users);
		})
	}
	factory.addUser = function(data, callback){

		$http.post('/add_user', data).success(function(response){
			if(response.error)
			{
				callback(response);
			}
			else
			{
				users.push(response);
				callback(users);
			}
		})
	}

	factory.signIn = function(data, callback){

		$http.post('/sign_in', data).success(function(response){
			if(response.error)
			{
				callback(response);
			}
			else
			{
				callback(response);
			}
		})
	}

	factory.removeUser = function(data, callback){
		var temp = data;
		$http.post('/remove_user', data).success(function(response)
		{
			users.splice(users.indexOf(temp), 1);
			callback(users);
		})
	}

	factory.updateUser = function(data1, data2, callback){
		
		$http.post('/update_user/'+ data1, data2).success(function(response){})
	}

	factory.getOneUser = function(data, callback){

		$http.post('/get_one_user/'+ data).success(function(response)
		{
			callback(response);
		})
	}

// -------------------------TOKEN FUNCTIONS-------------------------------

	factory.addToken = function(data, callback){
		
		$http.post('/add_token', data).success(function(response){})
	}

	factory.removeToken = function(data1, data2, callback){

		$http.post('/remove_token/'+ data1, {token:data2}).success(function(response){
			callback(response);
		})
	}


	return factory;
})