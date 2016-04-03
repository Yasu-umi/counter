'use strict';

var logger = require('../libs/logger');
var User = require('../model').User;


module.exports = {
  get: function(req, res){
    var query = { 'email': req.query.email, 'password': req.query.password };
    User.find(query, function(err, users){
      if (err) {
        logger.error.info({ message: 'Find User Error', err: err});
        return;
      }
      if (users.length === 0) {
        res.render('login');
        return;
      }
      req.session.user = req.query.email;
      res.redirect('/');
    });
  }
};
