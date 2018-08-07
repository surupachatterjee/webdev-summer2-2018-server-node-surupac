var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel',userSchema);


function createUser(user) {
     return userModel.create(user);
}

function findAllUsers() {
    return userModel.find({});
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function findUserByCredentials(credentials) {
    return userModel.findOne(credentials);
}

function updateUser(userId, updatedUser) {
    return userModel.update({_id: userId},
        {$set: updatedUser})
}

/*function findUserById(userId) {
    return userSchema.findById(userId);
}*/


var api = {
    createUser: createUser,
    findAllUsers: findAllUsers,
    findUserByCredentials: findUserByCredentials,
    updateUser:updateUser,
    findUserByUsername:findUserByUsername
    //findUserById:findUserById

}

module.exports= api;