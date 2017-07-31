var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var users = new mongoose.Schema({
	username: String,
	fullname: String,
	password: String,
	short_description: String,
	avatar: String,
	followers: [Schema.Types.ObjectId],
	following: [Schema.Types.ObjectId],
	posts:[]
},{
	collection: 'users'
});
mongoose.model('User', users);