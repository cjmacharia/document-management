const document = require('../controllers/documents-controller');

module.exports = (app) => {
	app.post('/document', document.create);

	app.get('/document', document.get);

	app.put('/document/:id', document.update);
};