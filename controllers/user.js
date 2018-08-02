/**
 * user controller
 * 
 */
const validator = require('validator');
const { wrap: async } = require('co');
const { UnAuthError, NameOrPassError, UserIsExistError } = require('../errors');
const Validators = require('../common/validate');
const { User } = require('../models');
const { responseJson } = require('../common/response');

/**
 * user login page
 *
 */
exports.loginPage = function(req, res, next) {
	res.render('login');
};

/**
 * user register page
 *
 */
exports.registerPage = function(req, res, next) {
	res.render('register');
};

/**
 * user logout
 *
 */
exports.logout = function(req, res, next) {
	req.session.destroy(function(err) {
		res.redirect('/');
	});
}

/**
 * user login
 *
 */
exports.login = async(function* (req, res, next) {
	let { username, password } = req.body;
	let checkUsernameResult = Validators.checkUsername(username);
	let checkPasswordResult = Validators.checkPassword(password);
	if (!checkUsernameResult.result) 
		return next(new Error(checkUsernameResult.message));
	if (!checkPasswordResult.result) 
		return next(new Error(checkPasswordResult.message));
	try {
		let user = yield User.findByUsername(username);
		if (!user) return next(new NameOrPassError());
		let result = yield User.comparePass(password, user.password);
		if (!result) return next(new NameOrPassError());
		req.session.user = user;
		responseJson(res, {id: user.id});
	} catch (err) {
		next(err);
	}
});

/**
 * user register
 *
 */
exports.register = async(function* (req, res, next) {
	let { username, password } = req.body;
	let checkUsernameResult = Validators.checkUsername(username);
	let checkPasswordResult = Validators.checkPassword(password);
	if (!checkUsernameResult.result) 
		return next(new Error(checkUsernameResult.message));
	if (!checkPasswordResult.result) 
		return next(new Error(checkPasswordResult.message));
	try {
		let findUser = yield User.findByUsername(username);
		if (findUser) return next(new UserIsExistError());
		let user = yield User.createUser(username, password);
		req.session.user = user;
		responseJson(res, {id: user.id});
	} catch (err) {
		next(err);
	}
});
