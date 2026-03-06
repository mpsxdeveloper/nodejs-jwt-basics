const mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
    nome: {
        type : String,        
        required : true,
        maxlength: 30
    },
    email: {
        type : String,
        unique : true,
        required : true,
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
        maxlength: 60
    }
})

const User = mongoose.model('user', userSchema)

module.exports = User
