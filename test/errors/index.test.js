const assert = require('assert');
const Errors = require('../../errors');
const codes  = require('../../errors/code');

describe('#error index', function() {

	it('# BaseError', function() {
		let message = 'test BaseError';
		let baseError = new Errors.BaseError(message);
		assert.equal(message, baseError.message);
		assert.equal(codes.ERROR_CODE, baseError.code);
	})

	it ('# BaseError', function() {
		let message = 'test BaseError';
		let code = 10018;
		let baseError = new Errors.BaseError(message, code);
		assert.equal(code, baseError.code);
	})

	it('# UnAuthError', function() {
		let unAuthError = new Errors.UnAuthError();
		assert.equal('用户未登陆', unAuthError.message);
		assert.equal(codes.UNAUTH_CODE, unAuthError.code);
	})

	it('#NameOrPassError', function() {
		let nameOrPassError = new Errors.NameOrPassError();
		assert.equal('用户名或密码不正确', nameOrPassError.message);
		assert.equal(codes.NAMEORPASSWRONG_CODE, nameOrPassError.code);
	})
})