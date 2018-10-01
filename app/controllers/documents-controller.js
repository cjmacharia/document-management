import  Document from '../models/document-model';
import  util from '../utils/document-util';
import  mongoose from 'mongoose';
mongoose.set('useFindAndModify', false);

export class documentController {
	static async create (req, res) {
		const CreateDocs = new Document ({
			_id: new mongoose.Types.ObjectId(),
			title: req.body.title,
			content: req.body.content,
			ownerId: req.userData.userId

		});
		const result = util.validate(CreateDocs);
		if (result === true) {
			try {
			let data = await CreateDocs.save();
				res.status(201).json({
					message: 'successfully save',
					content: data,
				});
			} catch(err) {
					res.status(500).json({
						error: err
					});
				}
		} else {
			res.status(401).json({
				error: result
			});
		}
	}

	static async get (req, res) {
		try { 
		let documents = await Document.find({})
			if (documents === null) {
				res.status(404).json({
					error: 'document not found'
				});
			} else {
				res.status(200).json({
					payload : data
				});
			}
		} catch(err) {
			res.status(404).json({
				error: 'the document does not exist'
			})
			
	}
	
	static async getOne (req, res) {
		res.status(200).json({
			data: req.data
		});
	}

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

	deleteDocs: (req, res) => {
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