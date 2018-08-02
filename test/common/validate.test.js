const assert = require('assert');
const Validator = require('../../common/validate');

describe('#validate', function() {
	let usernameshort = 'test';
	let usernameNormal = 'pheart';
	let usernameLong = 'fucktheworldtogether';
	let passwordShort = 'test';
	let passwordNormal = 'pheart';
	let passwordLong = 'fucktheworldtogether';

	it('#checkUsername', function() {
		assert.equal(Validator.checkUsername(usernameshort).result, false);
		assert.equal(Validator.checkUsername(usernameLong).result, false);
		assert.equal(Validator.checkUsername(usernameLong).message, 'username format error');
		assert.equal(Validator.checkUsername(usernameNormal).result, true);
	})

	it('#checkPassword', function() {
		assert.equal(Validator.checkPassword(passwordShort).result, false);
		assert.equal(Validator.checkPassword(passwordLong).result, false);
		assert.equal(Validator.checkPassword(passwordLong).message, 'password format error');
		assert.equal(Validator.checkPassword(passwordNormal).result, true);
	})
})
