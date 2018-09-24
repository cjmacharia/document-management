const users = require('../controllers/user-controller');
module.exports = (app) => {
	// create a user
	app.post('/signup', users.signUp);

	// user login

	app.post('/login', users.login);

	//get all users

	app.get('/getusers', users.getUsers);


};

