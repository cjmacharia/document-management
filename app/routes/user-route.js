import  UserController  from '../controllers/user-controller';
import checkAuth from '../middlewares/checkauth';

export default (app) => {
	// create a user
	app.post('/signup', UserController.signUp);

	// user login

	app.post('/login', UserController.login);

	// //get all users

	app.get('/getusers', UserController.getUsers);

	// get one user
	
	app.get('/getuser/:id', UserController.getOneUser);

	// //delete a user

	app.delete('/deleteuser/:id', UserController.deleteUser);

};
