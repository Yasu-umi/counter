'use strict';

var mongoose = require('mongoose');
var config = require('config');
var logger = require('./logger');


var getDB = function(url) {
  url = config.get('mongo.url') + url;
  return mongoose.createConnection(url, function(err, res){
    if (err) {
      logger.error.info({ message: 'Error Connected ' + url, err:  err });
      process.exit(1);
    } else {
      logger.system.info({ message: 'Success Connected ' + url });
    }
  });
};

module.exports = getDB;
