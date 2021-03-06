var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    role:String,
    email:String,
    phone:String,
    dateOfBirth:Date,
    address:String,
    sections:[String]
}, {collection: 'user'});

module.exports = userSchema;