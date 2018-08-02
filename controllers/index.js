const Helper = require('../common/helper');

exports.index = function(req, res, next) {
	res.render('index', { user: req.session.user });	
}