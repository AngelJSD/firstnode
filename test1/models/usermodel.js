
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserModelSchema = new Schema({
    name: String,
    age: Number
});

module.exports = mongoose.model('UserModel', UserModelSchema );
