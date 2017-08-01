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

router.get('/search', function(req, res){
	mongoose.model('User').find({username: 'daont'}, function(err, users){
		if(err){
			res.send("j");
		}else{
			console.log("users");
		}
	});
});

module.exports = router;