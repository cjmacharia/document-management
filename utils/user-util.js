const validator = require('validator');
const bcrypt = require('bcrypt');
module.exports = {
	validate: (data) => {
		const email = data.email;
		const name = data.name;
		const validEmail = validator.isEmail(email);
		let validName = name.replace(/\s/g, '') ;
		if (!validEmail) {
			return 'this must be a valid email';
		} 
		else if (!validName) {
			return 'the name can not be empty';
		} else if (validName) {
			const re = name.match(/^[A-Za-z]+$/);
			if(!re){
				return 'the name can not contain a number';
			} 
			return data;
		}
		return data;
	},
	hashPassword: (req, res, data) => {
		console.log(data, 'fdshjf' );
		try{
			const hashedPassword = bcrypt.hash(data, 10);
			return hashedPassword;
		} catch(err){
			return err;
		}
			
	}
};