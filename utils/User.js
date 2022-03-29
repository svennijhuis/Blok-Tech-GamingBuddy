const mongoose = require('mongoose')

// init the user object
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    residence: String,
    username: String,
    password: String,
    confirm_password: String
})

const User = mongoose.model('User', userSchema)
module.exports = User