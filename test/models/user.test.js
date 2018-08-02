const assert = require('assert');
require('../app');
const { User } = require('../../models');


describe('# UserSchema', function() {
	let USERNAME = 'username';
	let PASSWORD = 'password';

	before(function(done) {
		User.remove(done);
	});

	after(function(done) {
		User.remove(done);
	});

	it('# createUser', function(done) {
		User.createUser(USERNAME, PASSWORD)
			.then((user)=>{
				assert.equal(user.username, USERNAME);
				done();
			})
	});

	it('# findByUsername', function(done) {
		User.findByUsername(USERNAME)
			.then(user => {
				assert.equal(user.username, USERNAME);
				done();
			})
	});

	it('# comparePass', function(done) {
		User.findByUsername(USERNAME)
			.then(user => {
				User.comparePass(PASSWORD, user.password)
					.then(result => {
						assert.equal(result, true);
						done();
					}, err => {throw err})
			})
	});
})