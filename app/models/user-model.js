'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	_id: Schema.Types.ObjectId,
	name: String,
	email: {type: String, unique: true},
	role: { type: String, default: 'regular' },
	password: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;


