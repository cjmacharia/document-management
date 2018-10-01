export const registrationSuccess = (response, data) => {
	response.status(201).json(data);
};

export const registrationError = (res, err) => {
	res.status(409).json({
		message: err.message
	});
};

export const registrationDefaultError = (res, result) => {
	res.status(401).json({
		error: result
	});
};

export const userNotFoundError = (res) => {
	res.status(404).json({
		error: 'The user does not exist'
	});
};

export const loginSuccess = (res, token) => {
	res.status(200).json({
		message: 'Authentication successful', 
		token: token
	});
};

export const AuthenticationError = (res) => {
	res.status(401).json({
		message: 'authentication failed here'
	});
};

export const serverError = (res, err) => {
	res.status(500).json({
		message: err
	});	
};

export const getResultsSuccess = (res, results) => {
	res.status(200).json({
		data: results
	});
};