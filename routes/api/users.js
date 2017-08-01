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
			var follows = {};
			var follows_id = users.follows;

			follows_id.forEach(function(follow_id){
				mongoose.model('User').findById(follow, function(err, follow){
					if(err){
						res.send(err);
					}else{
						follows.push(follow);
					}
				});
			});

			res.json({
				follows: follows
			});
		}
	});
});
module.exports = router;