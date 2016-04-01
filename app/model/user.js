'use strict';

var mongoose = require('mongoose');
var getDB = require('../libs/getDB');


var UserSchema = new mongoose.Schema({
  id: String,
  email : String,
  password : String
});

module.exports = getDB('/user').model('User', UserSchema);
