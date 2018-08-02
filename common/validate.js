const validator = require('validator');

/**
 * validate username.
 * @param {String} username
 * @return {Object}
 		- result {Boolean} Verification result 
 		- message {String} the content of the Verify failure
 */
exports.checkUsername = (username = '') => {
	if (!validator.isLength(username, {min: 6, max: 16}))
		return {
			result: false,
			message: 'username format error'
		};
	
	return {result: true};
}

/**
 * validate password.
 * @param {String} password
 * @return {Object}
 		- result {Boolean} Verification result 
 		- message {String} the content of the Verify failure
 */
exports.checkPassword = (password = '') => {
	if (!validator.isLength(password, {min: 6, max: 16}))
		return {
			result: false,
			message: 'password format error'
		};
	
	return {result: true};
}