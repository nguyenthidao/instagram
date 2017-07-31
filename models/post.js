var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var posts = new mongoose.Schema({
	user_id: Schema.Types.ObjectID,
	feature: String,
	content: String,
	created_at: Schema.Types.Date,
	updated_at: Schema.Types.Date,
	like: Number,
	comments: {
		_id: Schema.Types.ObjectID,
		user_id: Schema.Types.ObjectID,
		content: String
	}
},{
	collection: 'posts'
});
mongoose.model('Post', posts);