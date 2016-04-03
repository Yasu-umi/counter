'use strict';

var logger = require('../libs/logger');
var User = require('../model').User;


module.exports = {
  get: function(req, res){
    var query = { email: req.session.user };
    User.findOne(query, function(err, user){
      if (err) {
        logger.error.info({ message: 'User FindOne Error', err: err });
        return;
      }
      res.render('index', { user: user.email, id: user.id});
    });
  }
};
