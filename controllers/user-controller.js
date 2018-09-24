const  User = require('../models/user-model');

exports.signUp = (req, res) => {
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	});
	user.save()
		.then(data => {
			console.log('>><><><><><><');
			console.log(data);
			res.status(200);
			res.json({
				message: 'Succssfully created a user',
				response: data});
		}).catch(err => {
			console.log('>><><><><><><');
			res.status(500).json({
				message: err.message
			});
		});
};