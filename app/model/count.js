'use strict';

var mongoose = require('mongoose');
var getDB = require('../libs/getDB');


var CountSchema = new mongoose.Schema({
  userId: String,
  name: String,
  created: Number
});

module.exports = getDB('/count').model('Count', CountSchema);
