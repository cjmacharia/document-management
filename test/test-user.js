process.env.NODE_ENV = 'test';
const chai = require('chai'),chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const mongoose = require('mongoose');
const sinon = require('sinon');
const userPage = require('../app/controllers/user-controller');
const should = chai.should();
const server = require('../app');
const Model = require('../app/models/user-model');

describe('API Tests', () => {
	before((req) => {
		Model.collection.drop();
		mongoose.connect('mongodb://localhost/testdb', { useNewUrlParser: true}).then(() => {
			console.log('successfully connected to db test');
		}).catch((err) => {
			console.log('failed', err);
		});
		const user = new Model ({
			'_id':`${new mongoose.Types.ObjectId()}`,
			'email': 'testone@gmail.com',
			'name': 'cjmash',
			'password': '6574893'
		});

			chai.request(server)
				.post('/signup')
				.send(user)
				.end((err, res) => {
					req.body = user;
				})
			
		after((done) => {
			mongoose.connection.close();
			done();
			process.exit();
		});
	
			
	});

	it('should return status 200 on get users', (done) => {
		chai.request(server)
			.get('/getusers')
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
	});


	it('should login an existing user /login' , (done) => {
		const userOne = new Model ({
			'_id':`${new mongoose.Types.ObjectId()}`,
			'email': 'testlogin@gmail.com',
			'name': 'cjmash',
			'password': '12345678'
		});
		userOne.save((err, data) => {
			console
			chai.request(server)
			.post('/login')
			.send(data)
			.end((err, res) => {
			})
		})
			
		done();
	});

	it('should list one user on /getuser/<id> ', (done) => {
		const user = new Model ({
			'_id':`${new mongoose.Types.ObjectId()}`,
			'email': 'test@gmail.com',
			'name': 'cjmash',
			'password': '6574893'
		});
		user.save((err, data) => {
			chai.request(server)
				.get('/getuser/'+data.id)
				.end((err, res) => {
					// console.log(res)
					res.should.have.status(200);
					res.should.be.json;
					res.body.should.be.a('object');
					res.body.data.should.have.property('_id');
					res.body.data.should.have.property('name');
					res.body.data.should.have.property('password');
					done();
				});
		});
	});

	it('should create a user /signup ', (done) => {
		const user = new Model ({
			'_id':`${new mongoose.Types.ObjectId()}`,
			'email': 'testuser@gmail.com',
			'name': 'cjmash',
			'password': '6574893'
		});
		chai.request(server)
			.post('/signup')
			.send(user)
			.end((err, res) => {
				res.should.have.status(201);
				res.should.be.json;
				res.body.should.be.a('object');
				done();
			});
	});

	it('should delete a user /deleteuser/<id> ', (done) => {
		// const user = new Model ({
		// 	'_id':`${new mongoose.Types.ObjectId()}`,
		// 	'email': 'testuser@gmail.com',
		// 	'name': 'cjmash',
		// 	'password': '6574893'
		// });
		// user.save((err, data) => {
			chai.request(server)
				.get('/getuser')
				.end((err, res) => {
					console.log(res, 'this is a get request')
					// chai.request(server)
					// 	.delete('/deleteuser/')
					// 	.end((err, res) => {
					// 		res.should.have.status(200);
					// 		res.should.be.json;
					// 		res.body.should.be.a('object');
					// 		res.body.message.should.equal('user successfully deleted');
					// 		done();
					// 	});
				});
		// });
	});
});