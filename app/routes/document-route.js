import { create, get, update, getOne, deleteDocs, getByUser, getAllByUser } from '../controllers/documents-controller';
import checkAuth from '../middlewares/checkauth';
import { find, findById } from '../models/document-model';
export default (app) => {
	app.param('uid', (req, res, next, id) => {
		find({ownerId: id}, (err, doc) => {
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
		findById(id, (err, doc) => {

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
	app.post('/documents',checkAuth, create);

	app.get('/documents', get);

	app.put('/documents/:did', update);

	app.get('/documents/:did', getOne);

	app.delete('/documents/:did', deleteDocs);

	app.get('/user/:uid/documents/:did', getByUser);

	app.get('/user/:uid/documents', getAllByUser);
};