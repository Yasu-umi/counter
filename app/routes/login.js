'use strict';

var logger = require('../libs/logger');
var User = require('../model').User;


module.exports = {
  get: function(req, res){
    var email = req.query.email;
    var password = req.query.password;
    var query = { 'email': email, 'password': password };
    User.find(query, function(err, model){
      if (err) {
        logger.error.info({ message: 'Find User Error', err: err});
        return;
      }
      if (model.length === 0) {
        res.render('login');
        return;
      }
      req.session.user = email;
      res.redirect('/');
    });
  }
};
