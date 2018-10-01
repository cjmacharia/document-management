const Document = require('../models/document-model');
const util = require('../utils/document-util');
var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
module.exports = {
	create: (req, res) => {
		const CreateDocs = new Document ({
			_id: new mongoose.Types.ObjectId(),
			title: req.body.title,
			content: req.body.content,
			ownerId: req.userData.userId

		});
		const result = util.validate(CreateDocs);
		if (result === true) {
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
		} else {
			res.status(401).json({
				error: result
			});
		}
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
	},
	
	getOne: (req, res) => {
		res.status(200).json({
			data: req.data
		});
	},

	update: (req, res) => {
		const doc = {
			title: req.body.title,
			content: req.body.content,
			modifiedAt: Date.now(),
		};
		req.data.updateOne(doc, (err, data) => {
			if (err) {
				res.status(500).json({
					error: err
				});
			} else {
				res.status(200).json ({
					data: data
				});
			}
		});
	},

	delete: (req, res) => {
		req.data.remove((err) => {
			if (err) { 
				res.status(404).json({
					error: 'The document does not exist',
				});
			} else {
				res.status(200).json({
					message: 'successfully deleted'
				});
			}
		});
	},

	getByUser: (req, res) => {
		res.status(200).json({
			data: req.data
		});
	},

	getAllByUser: (req, res) =>{
		res.status(200).json({
			data: req.data
		});
	}
};