// const { urlencoded, json } = require('body-parser');
// import { resolve } from  'path';
// import { uploader, cloudinaryConfig } from './config/cloudinaryConfig';
// import { multerUploads, dataUri } from './middlewares/multerUpload';



require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')

const MONGODB_URI = process.env.MONGODB_URL;
// import api
const orders = require('./routes/orders')

// initializes the express app
const app = express()
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
    useTempFiles: true
}))





app.use('/user', require('./routes/UserRouter.js'))
app.use('/api', require('./routes/upload.js'))

// initializes db with credentials 
mongoose.connect(MONGODB_URI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Mongo Database Connected to: ' + MONGODB_URI))
    .catch(err => console.log(err))


// set up CORS
app.use(cors())
// convert API response to json
// app.use(bodyParser.urlencoded({extended: true}))
// app.use(bodyParser.json())

// route for API interaction
app.use('/api/orders', orders)

// sets port number
const port = process.env.PORT || 5001

// initialize server
server = app.listen(port, () => console.log(`Server running on port ${port}`))