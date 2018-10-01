import  Document from '../models/document-model';
import  util from '../utils/document-util';
import  * as responses from '../utils/response';
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
				responses.creationSuccess(res, data);
			} catch(err) {
				responses.serverError(err);
			}
		} else {
			responses.AuthenticationError(res);
		}
	}

	static async get (req, res) {
		try { 
			let documents = await Document.find({});

			if (documents === null) {
				responses.NotFoundError(res);
			} else {
				responses.getResultsSuccess(res, documents);
			}
		} catch(err) {
			responses.NotFoundError(res);
		}
	}

	static async getOne (req, res) {
		let data = req.data;
		responses.getResultsSuccess(res, data);
	}

	static async update (req, res) {
		const doc = {
			title: req.body.title,
			content: req.body.content,
			modifiedAt: Date.now(),
		};
		try { 
			await req.data.updateOne(doc);
			responses.updateContentSuccess(res);
		} catch(err){
			responses.serverError(res);
		}
	}

	static async deleteDocs (req, res) {
		try{ 
			await req.data.remove();
			responses.deleteContentSuccess(res);
		} catch(err) {
			responses.NotFoundError(res);
		}
	}

	static async getByUser (req, res) {
		let data = req.data;
		responses.getResultsSuccess(res, data);
	}

	static async getAllByUser (req, res)  {
		let data = req.data;
		responses.getResultsSuccess(res, data);
	}
}

export default documentController;