var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = (function(){
	return {
		add: function(req, res)
		{
			errors = [];
			User.find({username: req.body.username}, function(error, db_res)
			{

				if(db_res.length == 0)
				{

					if(req.body.username == undefined || req.body.username == "")
					{
						errors.push("A username is required");
					}
					else if(!req.body.username.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm))
					{
						errors.push("Please enter a valid email");
					}
					if(req.body.password == undefined || req.body.password == "")
					{
						errors.push("Password is required");
						res.json({error: errors});
						return;
					}
					if(req.body.password !== req.body.confirm)
					{
						errors.push("Password confirmation did not match");
					}
					if(req.body.password.length < 8)
					{
						errors.push("Password must be at least 8 characters");
					}
					if(req.body.password.search(/\d/) == -1)
					{
						errors.push("Password must contain at least one number");
					}
					if(errors.length >= 1)
					{
						res.json({error: errors});
					}
					else
					{
						var new_user = new User({username: req.body.username, password: req.body.password, created_at: Date.now})
						new_user.save(function(err, data)
						{
							if(err)
							{
								console.log('user could not be saved to database', err);
							}
							else
							{
								// sending the newly saved user back to the userfactory
								res.json(data);
								return;
							}
						})
					}
				}
				else
				{
					// console.log('found user');
					console.log(db_res);
					errors.push("This email was already found in our system");
					res.json({error: errors});
					return;
				}
			})	
		},

		signIn: function(req, res)
		{
			console.log(req.body);
			User.find({username: req.body.username, password: req.body.password}, function(error, db_res)
			{
				if(db_res.length == 0)
				{
					res.json({error: "Could not find a user with those credentials in the database"});
				}
				else
				{
					console.log('found user');
					res.json(db_res[0]);
				}
			})
		},

		getUsers: function(req, res)
		{
			User.find({}, function(error, db_res)
			{
				if(error)
				{
					console.log('could not find any users in the db');
					console.log(error);
				}
				else
				{
					res.json(db_res);
				}
			})
		},

		remove: function(req, res)
		{
			User.remove({_id: req.body._id}, function(error, db_res)
			{
				if(error)
				{
					console.log('user could not be removed from db');
					console.log(error);
				}
				else
				{
					res.json(db_res);
				}
			})
		},

		getOneUser: function(req, res)
		{

			User.find({_id: req.params.id}, function(error, db_res){
				if(error)
				{
					console.log('could not find user');
					console.log(error)
				}
				else
				{
					res.json(db_res[0]);
				}
			})
		},

		addToken: function(req, res)
		{
			var text = "";
			   var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

			   for( var i=0; i < 20; i++ ){
			       text += possible.charAt(Math.floor(Math.random() * possible.length));
			   }
			console.log(text);
			console.log(req.params._id);
			User.update({_id: req.body._id}, {$addToSet: {tokens:text}, $currentDate: {lastModified: true, updated_date: {$type: "date"}}}, function(error, db_res){
				if(error)
				{
					console.log('user could not be updated');
					console.log(error);
				}
				{
//we do not get the document we updated on success
					res.json(db_res);
				}
			})
		},

		removeToken: function(req, res)
		{
			// console.log('hii', req.body.token);
			User.update({_id: req.params.id}, {$pull: {tokens:req.body.token}}, function(error, db_res){
				if(error)
				{
					console.log('unable to get rid of token');
					console.log(error);
				}
				else
				{
					console.log(db_res);
				}
			})
		},

		updateUser: function(req, res)
		{
			if(req.body.username == null || req.body.username == "")
			{
				User.update({_id: req.params.id}, {password: req.body.password}, function(error, db_res){
					if(error)
					{
						console.log('user could not be updated');
						console.log(error);
					}
					else
					{
						console.log(db_res);
					}
				})
			}
			else if(req.body.password == null || req.body.password == "")
			{
				User.update({_id: req.params.id}, {username: req.body.username}, function(error, db_res){
					if(error)
					{
						console.log('user could not be updated');
						console.log(error);
					}
					else
					{
						console.log(db_res);
					}
				})
			}
			else
			{
				User.update({_id: req.params.id}, {username: req.body.username, password: req.body.password}, function(error, db_res){
					if(error)
					{
						console.log('user could not be updated');
						console.log(error);
					}
					else
					{
						console.log(db_res);
					}
				})
			}
		}

	} //closing bracket for return statement
})();
