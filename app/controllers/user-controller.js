import bcrypt from 'bcrypt';
import jwt from'jsonwebtoken';
import mongoose from 'mongoose';
import  User  from '../models/user-model';
import util  from '../utils/user-util';
import  * as responses from '../utils/response';
class UserController { 
	static async  signUp  (req, res)  {
		const hashedPass = await util.hashPassword(req, res, req.body.password);
		const userSignUp = new User({
			_id: new mongoose.Types.ObjectId(),
			name: req.body.name,
			email: req.body.email,
			password: hashedPass
		});

		const result = util.validate(userSignUp);
		if (result === userSignUp) { 
			try { 
				let data = await userSignUp.save();
				responses.creationSuccess(res, data);
			} catch(err) {
				responses.registrationError(res, err);
			}
		}	
		else {
			responses.registrationDefaultError(res, result);
		}
	}

	static async login (req, res) {
		try { 
			let  user = await User.findOne({email: req.body.email});
			if(user === null) {
				responses.NotFoundError(res);
			} else { 
				try { 
					await bcrypt.compare(req.body.password, user.password);
					const token = jwt.sign({ email: user.email,
						userId: user.id
					}, process.env.JWT_KEY, {
						expiresIn: '1hr'
					}
					);
					responses.loginSuccess(res, token);
				} catch(err) {
					responses.AuthenticationError(res);
				}
			}
		} catch(err) {
			responses.serverError(res, err);
		}
	}
	
	static async getUsers (req, res) {
		try { 
			let users  = await User.find({});
			responses.getResultsSuccess(res, users);
		} catch(err) {
			responses.serverError(res, err);			
		}
	}

	static async getOneUser (req, res) {
		const id = req.params.id;
		try { 
			let user = await User.findById({_id: id});
			if(user != null) {
				responses.getResultsSuccess(res, user);
			} else {
				responses.NotFoundError(res);
			}
		} catch (err) {
			responses.NotFoundError(res);
		}
	}

	static async deleteUser (req, res) {
		const id = req.params.id;
		try { 
			let user = await User.findByIdAndRemove({_id: id});
			if (user === null) {
				responses.NotFoundError(res);
			} else { 
				responses.deleteContentSuccess(res);
			}
		} catch(err) {
			responses.NotFoundError(res);
		}
	}
}

export default UserController;
