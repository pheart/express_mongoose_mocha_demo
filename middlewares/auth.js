const { UnAuthError } = require('../errors');

module.exports = (req, res, next) => {
	if (!req.session || !req.session.user || !req.session.user.username) {
		if (req.headers['accept'] && req.headers['accept'].includes('application/json')) {
			return next(UnAuthError());
		} else {
			res.redirect('/user/login');
		}
	}
	next();
}