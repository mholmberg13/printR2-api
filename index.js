const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')


// import api
const orders = require('./routes/api/orders')

// nitializes the express app
const app = express()

// set up CORS
app.use(cors())
// convert API response to json
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// import db credentials
const db = require('./config/keys').mongoURI

// initializes db with credentials 
mongoose.set('useFindAndModify', false)
mongoose.set('useNewUrlParser', true)
mongoose.set('useUnifiedTopology', true)
mongoose
    .connect(db, () => {}, {useNewUrlParser: true})
    .then(() => console.log('Mongo Database Connected'))
    .catch(err => console.log(err))


// route for API interaction
app.use('/api/orders', orders)

// sets port number
const port = process.env.PORT || 5001

// initialize server
server = app.listen(port, () => console.log(`Server running on port ${port}`))