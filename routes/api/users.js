var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	multer = require('multer'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override')
	;

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

var upload = multer({ 
	storage: storage 
});

router.get('/', function(req, res, next){
		mongoose.model('User').find({}, function (err, user) {
			if(err){
				res.json({
					status: 500,
					err: "create user error"
				});
			}else{
				res.json({
					user : user
				});
			}
		});
});

router.post('/', upload.single('feature'), function(req, res) {
	var username = req.body.username;
	var fullname = req.body.fullname;
	var password = req.body.password;
	var short_description = req.body.short_description;
	var feature = '/images/' + req.file.filename;
	var followers = [];
	var following = [];
	var requested_by = [];
	var posts = [];

	mongoose.model('User').create({
		username: username,
		fullname: fullname,
		password: password,
		short_description: short_description,
		avatar : feature,
		followers: followers,
		following: following,
		requested_by: requested_by,
		posts: posts
	}, function (err, user) {
		if(err){
			res.json({
				status: 500,
				err: "create user error"
			});
		}else{
			res.json({
				user: user
			});
		}
	});
});

router.get('/:id', function(req, res){
	mongoose.model('User').findById(req.params.id, function(err, user){
		if(err){
			res.json({
				status: 500,
				err: "create user error"
			});
		}else{
			res.json({
				data: {
					"id" : user._id,
					"username": user.username,
					"fullname": user.fullname,
					"avatar": user.avatar,
					"counts": {
						"follows": user.followers.length,
						"followed_by": user.following.length
					}
				}
			});
		}
	});
});

router.get('/:id/follows', function(req, res){
	mongoose.model('User').findById(req.params.id, function(err, users){
		if(err){
			res.json({
				status: 500,
				err: "create user error"
			});
		}else{
			var follows = [];
			var follows_id = users.following;

			mongoose.model('User').find({_id: {$in: follows_id}}, function(err, follows){
				if(err){
					res.json({
						status: 500,
						err: "create user error"
					});
				}else{
					res.json({
						follows: follows
					});
				}
			});
		}
	});
});

router.get('/:id/followed-by', function(req, res){
	mongoose.model('User').findById(req.params.id, function(err, users){
		if(err){
			res.json({
				status: 500,
				err: "create user error"
			});
		}else{
			var followers = [];
			var followers_id = users.followers;

			mongoose.model('User').find({_id: {$in: followers_id}}, function(err, followers){
				if(err){
					res.json({
						status: 500,
						err: "create user error"
					});
				}else{
					res.json({
						followers: followers
					});
				}
			});
		}
	});
});

router.get('/:id/requested-by', function(req, res){
	mongoose.model('User').findById(req.params.id, function(err, users){
		if(err){
			res.json({
				status: 500,
				err: "create user error"
			});
		}else{
			var requested_by = [];
			var requested_by_id = users.requested_by;

			mongoose.model('User').find({_id: {$in: requested_by_id}}, function(err, requested_by){
				if(err){
					res.json({
						status: 500,
						err: "create user error"
					});
				}else{
					res.json({
						requested_by: requested_by
					});
				}
			});
		}
	});
});

router.get('/search', function(req, res){
	res.send('h');
});
module.exports = router;