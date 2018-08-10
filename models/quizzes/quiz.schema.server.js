var mongoose = require('mongoose');
module.exports = mongoose.Schema({
    title:{type:String}
}, {collection: 'quiz'});

