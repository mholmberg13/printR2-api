const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        requrired: [true, "Please enter your first name."],
        trim: true
    },
    lastName: {
        type: String,
        requrired: [true, "Please enter your last name."],
        trim: true
    },
    email: {
        type: String,
        requrired: [true, "Please enter your email."],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        requrired: [true, "Please enter your password."]
    },
    role: {
        type: Number,
        default: 0 // 0 = user, 1 = admin
    },
    orders: {
        type: Array,
        default: []
    }

}, {
    timestamps: true
})

module.exports = mongoose.model("Users", userSchema)