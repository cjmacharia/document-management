import { verify } from 'jsonwebtoken';
export default (req, res, next) => {
	try {
		const decoded = verify(req.headers.token, process.env.JWT_KEY);
		req.userData = decoded;
		next();
	} catch (error) {
		return res.status(401).json({
			message: error
		});
	} 
};