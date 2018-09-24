const  User = require('../models/user-model');

exports.signUp = (req, res) => {
	const userSignUp = new User({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	});
	userSignUp.save()
		.then(data => {
			console.log(data);
			res.status(200);
			res.json({
				message: 'Succssfully created a user',
				response: data});
		}).catch(err => {
			res.status(500).json({
				message: err.message
			});
		});
};
