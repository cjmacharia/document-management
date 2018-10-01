import bcrypt from 'bcrypt';
import jwt from'jsonwebtoken';
import mongoose from 'mongoose';
import  User  from '../models/user-model';
import util  from '../utils/user-util';

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
			try{ 
				let data = await userSignUp.save();
				res.status(201);
				res.json({
					message: 'Succssfully created a user',
					response: data});
			} catch(err) {
				res.status(500).json({
					message: err.message
				});
			}
		}	else {
			res.status(401).json({
				error: result
			});
		}
	}

	static async login (req, res) {
		try{ 
			let  user = await User.findOne({email: req.body.email
			});
			if(user === null) {
				res.status(404).json({
					message: 'authentication failed'
				});
			} else { 
				bcrypt.compare(req.body.password, user.password, (err, result) => {
					if (err) {
						res.status(401).json({
							message: 'authentication failed here'
						});
					}
					if (result) {
						const token = jwt.sign({ email: user.email,
							userId: user.id
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
		} catch(err) {
			res.status(500).json({
				message: err
			});
		}
	}
	
	static async getUsers (req, res) {
		try { 
			let users  = await User.find({});
			res.status(200).json({
				data: users
			});
		} catch(err) {
			res.status(404).json({
				error: err
			});
		}
	}

	static async getOneUser (req, res) {
		const id = req.params.id;
		try { 
			let user = await User.findById({_id: id});
			if(user != null) {
				res.status(200).json({
					data: user
				});
			} else {
				res.status(404).json({
					error: 'The user does not exist',
				});
			}
		} catch (err) {
			res.status(404).json({
				error: err
			});
		}
	}

	static async deleteUser (req, res) {
		const id = req.params.id;
		try { 
			let user = await User.findByIdAndRemove({_id: id});
			if (user === null) {
				res.status(404).json({
					message: 'the user does not exist'
				});
			} else { 
				res.status(200).json({
					message: 'user successfully deleted'
				});
			}
		} catch(err) {
			res.status(404).json({
				error: 'The user does not exist',
			});
		}
	}
}

export default UserController;
