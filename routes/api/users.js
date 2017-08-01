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
				user: user
			});
		}
	});
});
router.get('/:id/follows', function(req, res){
	mongoose.model('User').findById(req.params.id, function(err, user){
		if(err){
			res.send(err);
		}else{
			res.json({
				follows: user.follows
			});
		}
	})
});
module.exports = router;