const users = require('../controllers/user-controller');
module.exports = (app) => {
	// create a user
	app.post('/signup', users.signUp);

	// user login

	app.post('/login', users.login);


	//get all users

	app.get('/getusers', users.getUsers);

	// get one user
	
	app.get('/getuser/:id', users.getOneUser);

	//delete a user

	app.delete('/deleteuser/:id', users.deleteUser);

};

