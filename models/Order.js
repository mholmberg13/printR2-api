const mongoose = require('mongoose')
const Schema = mongoose.Schema


const OrderSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true    }
})

module.exports = Order = mongoose.model('order', OrderSchema)