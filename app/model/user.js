'use strict';

var mongoose = require('mongoose');
var config = require('config');
var getDB = require('../libs/getDB');


var UserSchema = new mongoose.Schema({
  id: String,
  email : String,
  password : String
});

module.exports = getDB(config.get('mongo.url') + '/user').model('User', UserSchema);
