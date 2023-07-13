const {Schema , model} = require('mongoose')

let userSchema = new Schema({
    email : String,
    password : String
})

const User = model('User' , userSchema)

module.exports = User;