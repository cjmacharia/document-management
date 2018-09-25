'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user-model');

const documentSchema = new Schema ({
	_id: Schema.Types.ObjectId,	
	ownerId: [{type: Number, ref: 'User'}],
	title: {type: String, required: true},
	content: {type: String, required: true},
	createdAt: {type: Date , default: Date.now},
	modifiedAt: {type: Date , default: Date.now}

});

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;