const mongoose = require('mongoose')
const Schema = mongoose.Schema


const OrderSchema = new Schema({
    name: {
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
    }
})

module.exports = Order = mongoose.model('order', OrderSchema)