const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');	
const postRoutes = require('./routes/post');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

// db
mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  })
.then(() => console.log('DB Connected'));

mongoose.connection.on('error', err =>{
	console.log(`DB connection error: ${err.message}`);
})

const port = process.env.PORT || 8080;


app.use(morgan('dev'));
app.use(bodyParser.json())
app.use('/', postRoutes);
app.listen(port);

console.log(`Server is running at port ${port}`);
