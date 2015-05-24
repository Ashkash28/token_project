var user = require('../server/controllers/users.js');

module.exports = function(app)
{
	app.get('/users', function(req, res)
	{
		user.getUsers(req, res);
	})

	app.post("/add_user", function(req, res)
	{
		user.add(req, res);
	})

	app.post("/sign_in", function(req, res)
	{
		user.signIn(req, res);
	})

	app.post('/remove_user', function(req, res)
	{
		user.remove(req, res);
	})

	app.post('/get_one_user/:id', function(req, res)
	{
		user.getOneUser(req, res);
	})

	app.post('/add_token', function(req,res)
	{
		user.addToken(req, res);
	})

	app.post('/remove_token/:id', function(req, res)
	{
		user.removeToken(req, res);
	})

	app.post('/update_user/:id', function(req, res)
	{
		user.updateUser(req, res);
	})
}