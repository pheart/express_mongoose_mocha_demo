const request = require('supertest');
const app = require('../app');
const assert = require('assert');
const Request = request(app);
const { User } = require('../../models');
const Errors = require('../../errors');
const Codes = require('../../errors/code');


describe('# webRouter', () => {

	before((done) => {
		User.remove(done);
	});

	after((done) => {
		User.remove(done);
	});

	it('# /user/login get', (done) => {
		Request
			.get('/user/login')
			.expect(200)
			.end((err, res) => {
				if (err) throw err;
				assert.equal(res.headers['content-type'], 'text/html; charset=utf-8');
				done();
			});
	})

	it('# /user/register get', (done) => {
		Request
			.get('/user/register')
			.expect(200)
			.end((err, res) => {
				if (err) throw err;
				assert.equal(res.headers['content-type'], 'text/html; charset=utf-8');
				done();
			})
	})

	describe('# /user/login post', () => {
		before(done => {
			User.createUser('username1', 'password1')
				.then(user=>done())
		})

		after(done=>{
			User.remove(done);
		})

		it('# use error username, get code equal new NameOrPassError().code', done => {
			Request
				.post('/user/login')
				.send({username: 'username', password: 'password'})
				.set('Accept', 'application/json')
				.expect(200)
				.end((err, res) => {
					if (err) throw err;
					assert.equal(res.body.code, new Errors.NameOrPassError().code);
					done();
				})			
		})

		it('# use error password, get code equal new NameOrPassError().code', done => {
			Request
				.post('/user/login')
				.send({username: 'username1', password: 'password'})
				.set('Accept', 'application/json')
				.expect(200)
				.end((err, res) => {
					if (err) throw err;
					assert.equal(res.body.code, new Errors.NameOrPassError().code);
					done();
				})			
		})		

		it('# use right username and password, get code equal 0', done => {
			Request
				.post('/user/login')
				.send({username: 'username1', password: 'password1'})
				.set('Accept', 'application/json')
				.expect(200)
				.end((err, res) => {
					if (err) throw err;
					assert.equal(res.body.code, Codes.SUCCESS_CODE);
					done();
				})				
		})
	})

	describe('# /user/register post', () => {
		before(done => {
			User.createUser('username1', 'password1')
				.then(user=>done())
		})

		after(done=>{
			User.remove(done);
		})

		it('# use short username, get code equal Codes.ERROR_CODE', done => {
			Request
				.post('/user/register')
				.send({username: 'user', password: 'password'})
				.set('Accept', 'application/json')
				.expect(200)
				.end((err, res) => {
					if (err) throw err;
					assert.equal(res.body.code, Codes.ERROR_CODE);
					done();
				})			
		})

		it('# use existed username, get code equal new UserIsExistError().code', done => {
			Request
				.post('/user/register')
				.send({username: 'username1', password: 'password'})
				.set('Accept', 'application/json')
				.expect(200)
				.end((err, res) => {
					if (err) throw err;
					assert.equal(res.body.code, new Errors.UserIsExistError().code);
					done();
				})			
		})

		it('# use new username and password, get code equal 0', done => {
			Request
				.post('/user/register')
				.send({username: 'username2', password: 'password2'})
				.set('Accept', 'application/json')
				.expect(200)
				.end((err, res) => {
					if (err) throw err;
					assert.equal(res.body.code, Codes.SUCCESS_CODE);
					done();
				})
		})

	})

	describe('# /', done => {
		before(done => {
			User.createUser('username1', 'password1')
				.then(user=>done())
		})

		after(done=>{
			User.remove(done);
		})

		it('# user is not login, redirect to /user/login', done => {
			Request
				.get('/')
				.expect(302)
				.end((err, res) => {
					if (err) throw err;
					assert.equal(res.headers.location, '/user/login');
					done();
				})
		})

		it('# user is login', done => {
			Request
				.post('/user/login')
				.send({username: 'username1', password: 'password1'})
				.set('Accept', 'application/json')
				.expect(200)
				.end((err, res) => {
					if (err) throw err;
					Request
						.get('/')
						.set('Cookie', res.headers['set-cookie'])
						// .expect(200)
						.end((err, res) => {
							if (err) throw err;
							assert.equal(res.headers['content-type'], 'text/html; charset=utf-8');
							done();
						})
				})				
			
		})
	})

});