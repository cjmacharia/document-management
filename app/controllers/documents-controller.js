import  Document from '../models/document-model';
import  util from '../utils/document-util';
import  mongoose from 'mongoose';
// mongoose.set('useFindAndModify', false);

class documentController {
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
			let documents = await Document.find({});
			
			if (documents === null) {
				res.status(404).json({
					error: 'document not found'
				});
			} else {
				res.status(200).json({
					payload : documents
				});
			}
		} catch(err) {
			res.status(404).json({
				error: 'the document does not exist'
			});
			
		}
	}
	static async getOne (req, res) {
		res.status(200).json({
			data: req.data
		});
	}

	static async update (req, res) {
		const doc = {
			title: req.body.title,
			content: req.body.content,
			modifiedAt: Date.now(),
		};
		try { 
			await req.data.updateOne(doc);
			res.status(200).json ({
				message: 'Document successfully updated'
			});
		} catch(err){
			res.status(500).json({
				error: err
			});
		}
	}

	static async deleteDocs (req, res) {
		try{ 
			await req.data.remove();
			res.status(200).json({
				message: 'successfully deleted'
			});
		} catch(err) {
			res.status(404).json({
				error: err
			});
		}
	}

	static async getByUser (req, res) {
		res.status(200).json({
			data: req.data
		});
	}

	static async getAllByUser (req, res)  {
		res.status(200).json({
			data: req.data
		});
	}
}

export default documentController;