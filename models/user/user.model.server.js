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


/*function findUserById(userId) {
    return userSchema.findById(userId);
}*/


var api = {
    createUser: createUser,
    findAllUsers: findAllUsers,
    findUserByCredentials: findUserByCredentials
    //findUserById:findUserById

}

module.exports= api;