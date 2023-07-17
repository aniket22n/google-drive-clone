const {Schema , model} = require('mongoose');

let userSchema = new Schema({
    email : { type: String, required: true },
    password : { type: String, required: true}
})

const User = model('User' , userSchema)

module.exports = User;