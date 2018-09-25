const Document = require('../models/document-model');
var mongoose = require('mongoose');
module.exports = {
	create: (req, res) => {
		const CreateDocs = new Document ({
			_id: new mongoose.Types.ObjectId(),
			title: req.body.title,
			content: req.body.content
		});
		CreateDocs.save()
			.then(data => {
				res.status(201).json({
					message: 'successfully save',
					content: data,
				});
			}).catch(err => {
				res.status(500).json({
					error: err
				});
			});
	},
   
};