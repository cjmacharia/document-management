const document = require('../controllers/documents-controller');
const checkAuth = require('../middlewares/checkauth');
module.exports = (app) => {
	app.post('/document',checkAuth, document.create);

	app.get('/document', document.get);

	app.put('/document/:id', document.update);

	app.get('/document/:id', document.getOne);

	app.delete('/document/:id', document.delete);
};