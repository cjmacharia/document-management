const document = require('../controllers/documents-controller');

module.exports = (router) => {
	router.post('/document', document.create);
};