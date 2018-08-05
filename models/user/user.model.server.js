var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel',userSchema);


function createUser(user) {
     return userModel.create(user);
}

function findAllUsers() {
    return userModel.find({});
}

function findUserByCredentials(credentials) {
    return userModel.findOne(credentials, {username: 1});
}

var api = {
    createUser: createUser,
    findAllUsers: findAllUsers,
    findUserByCredentials: findUserByCredentials

}

module.exports= api;