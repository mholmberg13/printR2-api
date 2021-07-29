const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/orders';
// import api
const orders = require('./routes/api/orders')

// nitializes the express app
const app = express()



// import db credentials
// const db = require('./config/keys').mongoURI


// initializes db with credentials 
mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => console.log('Mongo Database Connected'))
    .catch(err => console.log(err))


app.use(express.json());

// set up CORS
app.use(cors())
// convert API response to json
// app.use(bodyParser.urlencoded({extended: true}))
// app.use(bodyParser.json())

// route for API interaction
app.use('/api/orders', orders)

// sets port number
const port = process.env.PORT || 5000

// initialize server
server = app.listen(port, () => console.log(`Server running on port ${port}`))