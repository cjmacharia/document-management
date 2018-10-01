import express from 'express';
import bodyParser from'body-parser';
import mongoose from'mongoose';
import { url } from'./config/db.config';
import documentRoutes from './app/routes/document-route';
import userRoutes from './app/routes/user-route';
const app = express();
console.log(url)
app.use(bodyParser.json());

const port = 8080;
if (process.env.NODE_ENV === 'DEVELOPMENT'){
	mongoose.connect(url,  { useNewUrlParser: true }).then(() => {
		console.log('successfully connected to the database');
	}).catch((err) =>{
		console.log('an error occured', err);
	});
}
documentRoutes(app);
userRoutes(app);
const server = app.listen(port, () => {
	console.log('server runing on' + port);
});
export default  server;