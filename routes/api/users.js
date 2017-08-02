var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	multer = require('multer'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override')
	;

router.get('/:id', function(req, res){
	mongoose.model('User').findById(req.params.id, function(err, user){
		if(err){
			res.send(err);
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
			res.send(err);
		}else{
			var follows = [];
			var follows_id = users.following;

			mongoose.model('User').find({_id: {$in: follows_id}}, function(err, follows){
				if(err){
					res.send(err);
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
			res.send(err);
		}else{
			var followers = [];
			var followers_id = users.followers;

			mongoose.model('User').find({_id: {$in: followers_id}}, function(err, followers){
				if(err){
					res.send(err);
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
			res.send(err);
		}else{
			var requested_by = [];
			var requested_by_id = users.requested_by;

			mongoose.model('User').find({_id: {$in: requested_by_id}}, function(err, requested_by){
				if(err){
					res.send(err);
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