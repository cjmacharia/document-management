import documentsController from '../controllers/documents-controller';
import checkAuth from '../middlewares/checkauth';
import documentModel from '../models/document-model';

export default (app) => {
	app.param('uid', (req, res, next, id) => {
		documentModel.find({ownerId: id}, (err, doc) => {
			if (doc.length < 1 ) {
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
	app.post('/documents',checkAuth, documentsController.create);

	app.get('/documents', documentsController.get);

	app.put('/document/:did', documentsController.update);

	app.get('/document/:did', documentsController.getOne);

	app.delete('/document/:did', documentsController.deleteDocs);

	app.get('/user/:uid/document/:did', documentsController.getByUser);

	app.get('/user/:uid/documents', documentsController.getAllByUser);
};