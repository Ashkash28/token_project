var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	username: String,
	password: String,
	tokens: [String],
	updated_date: {type: Date, default: Date.now},
	created_date: { type: Date, default: Date.now },
});

var User = mongoose.model('User', userSchema);