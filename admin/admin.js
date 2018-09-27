const mongoose = require('mongoose');
const dbConfig = require('../config/db.config');
const assert = require('assert');
const User =require('../models/user-model');
mongoose.connect(dbConfig.url,  { useNewUrlParser: true }).then(() => {
	console.log('successfully connected to the database please register an admin');
}).catch((err) =>{
	console.log('an error occured', err);
});

const createAdmin = (data) => {
	console.log(data);
	User.create(data, (err) => {
		assert.equal(null, err);
		console.info('successfully added');
	});
};

module.exports = {createAdmin};