const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const UserSchema = new mongoose.Schema({
	username: { type: String },
	password: { type: String },
});


/**
 * create user
 * @params {String} username
 * @params {String} password
 * @return {Promise} 
 */
UserSchema.statics.createUser = function(username, password) {
	let _this = this;
	return new Promise((resolve, reject) => {
		bcrypt.hash(password, saltRounds, (err, hash) => {
			_this.create({
				username,
				password: hash
			}, (err, user) => {
				if (err) return reject(err);
				resolve(user);
			});
		});
	});
}

/**
 * find user by username
 * @params {String} username
 * @return {Promise} 
 */
UserSchema.statics.findByUsername = function(username) {
	return this.findOne({username: username})
				.exec();
}

/**
 * compare password
 * @params {String} targetPassword 
 * @params {String} sourcePassword   an encrypted password
 * @return {Promise} 
 */
UserSchema.statics.comparePass = function(targetPassword, sourcePassword) {
	return new Promise((resolve, reject) => {
		bcrypt.compare(targetPassword, sourcePassword, function(err, result) {
			if (err) return reject(err);
			resolve(result);
		});	
	});
}

mongoose.model('user', UserSchema);