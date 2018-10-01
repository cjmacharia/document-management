const document = require('../controllers/documents-controller');
const checkAuth = require('../middlewares/checkauth');
const documentModel = require('../models/document-model');
const user = require('../models/user-model');
module.exports = (app) => {
	app.param('uid', (req, res, next, id) => {
		documentModel.find({ownerId: id}, (err, doc) => {
			if (err) {
				return res.status(404).json({
					error: 'The user does not exist'
				});
			}
			if(!doc) {
				return res.status(404).json({
					error: 'The user does not exist '
				});
			}
			req.data = doc;
			return next();
		});
	});

	app.param('did', (req, res, next, id) => {
		documentModel.findById(id, (err, doc) => {

			if (err) {
				return res.status(404).json({
					error: 'The document does not exist'
				});
			}
			if(!doc) {
				return res.status(404).json({
					error: 'The document does not exist'
				});
			}
			req.data = doc;
			next();
		});
	});
	app.post('/documents',checkAuth, document.create);

	app.get('/documents', document.get);

	app.put('/documents/:did', document.update);

	app.get('/documents/:did', document.getOne);

	app.delete('/documents/:did', document.delete);

	app.get('/user/:uid/documents/:did', document.getByUser);

	app.get('/user/:uid/documents', document.getAllByUser);
};