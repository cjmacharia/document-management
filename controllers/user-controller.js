const  User = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
module.exports = {
	signUp: (req, res) => {
		bcrypt.hash(req.body.password, 10, (err, hash) => {
			if(err) {
				return res.status.json({
					error: err
				});
			} else {
				const userSignUp = new User({
					name: req.body.name,
					email: req.body.email,
					password: hash
				});
				userSignUp.save()
					.then(data => {
						res.status(201);
						res.json({
							message: 'Succssfully created a user',
							response: data});
					}).catch(err => {
						res.status(500).json({
							message: err.message
						});
					});
			}
		});
	},

	login: (req, res) => {
		User.find({email: req.body.email
		}).then(user => {
			if(user.length < 1) {

				res.status(401).json({
					message: 'authentication failed'
				});
			} else { 
				console.log(user[0].password,'pass');
				bcrypt.compare(req.body.password, user[0].password, (err, result) => {
					if (err) {
						res.status(401).json({
							message: 'authentication failed here'
						});
					}
					if (result) {
						const token = jwt.sign({ email: user[0].email,
							userId: user[0].id
						}, process.env.JWT_KEY, {
							expiresIn: '1hr'
						}
						);
						res.status(200).json({
							message: 'Authentication successful', 
							token: token
						});
					}
				});
			}
		}).catch(err => {
			res.status(500).json({
				message: err
			});
		});
	}
};