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

	get: (req, res) => {
		Document.find({}, (err, data) => {
			if (err) {
				res.status(500).json({
					error: err
				});
			} else if (data === null) {
				res.status(404).json({
					error: 'document not found'
				});
			} else {
				res.status(200).json({
					payload : data
				});
			}

		});
	}
   
};