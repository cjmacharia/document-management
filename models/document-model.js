'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const documentSchema = new Schema ({
	_id: Schema.Types.ObjectId,	
	title: {type: String, required: true},
	content: {type: String, required: true},
	ownerId: {type: String},
	createdAt: {type: Date , default: Date.now},
	modifiedAt: {type: Date , default: Date.now}

});

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;