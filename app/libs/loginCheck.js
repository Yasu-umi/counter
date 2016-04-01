'use strict';

var logger = require('./logger');


var loginCheck = function(req, res, next) {
  if ('session' in req && 'user' in req.session){
    next();
  } else {
    res.redirect('/login');
  }
};

module.exports = loginCheck;
