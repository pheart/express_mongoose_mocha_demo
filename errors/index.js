const codes = require('./code');

/**
 * extends Base error
 * @params {String} message
 * @params {Number} code 
 */
function extendError(message = '', code = codes.ERROR_CODE) {
	let f = function(_message) {
		BaseError.call(this, _message ? _message : message, code);
	};
	return f;
}

function BaseError(message, code) {
	let error = Error.call(this, message);
	this.message = message;
	this.code = code || codes.ERROR_CODE;
}

let UnAuthError = extendError('用户未登陆', codes.UNAUTH_CODE);
let NameOrPassError = extendError('用户名或密码不正确', codes.NAMEORPASSWRONG_CODE);
let UserIsExistError = extendError('用户已经存在', codes.USERNAMEEXIST_CODE);

exports.BaseError = BaseError;
exports.UnAuthError = UnAuthError;
exports.NameOrPassError = NameOrPassError;
exports.UserIsExistError = UserIsExistError