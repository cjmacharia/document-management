const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dbConfig = require('./config/db.config');
//const userRoutes = require('./routes/user-route');
const app = express();

app.use(bodyParser.json());


app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// Error Handler
app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.json({
		error: {
			message: err.message
		}
	});
});
const port = 8080;
mongoose.connect(dbConfig.url,  { useNewUrlParser: true }).then(() => {
	console.log('successfully connected to the database');
}).catch((err) =>{
	console.log('an error occured', err);
});
require('./routes/document-route')(app);
require('./routes/user-route')(app);
app.listen(port, () => {
	console.log('server runing on' + port);
});