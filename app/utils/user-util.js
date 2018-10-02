import  validator from 'validator';
import  bcrypt from 'bcrypt';

export const validate  = (data) => {
	const email = data.email;
	const name = data.name;
	const validEmail = validator.isEmail(email);
	let validName = name.replace(/\s/g, '');
	
	if (!validEmail) {
		return 'this must be a valid email';
	}
	else if (!validName) {
		return 'the name can not be empty';
	}
	else if (validName) {
		const re = name.match(/^[A-Za-z\s]*$/);
		if (!re) {
			return 'the name can not contain a number';
		}
		return data;
	}
	return data;
};

export const  hashPassword = (req, res, data) => {
	try {
		const hashedPassword = bcrypt.hash(data, 10);
		return hashedPassword;
	}
	catch (err) {
		return err;
	}
};