'use strict';

var logger = require('../libs/logger');
var User = require('../model').User;


module.exports = {
  get: function(req, res){
    var query = { email: req.session.user };
    User.findOne(query, function(err, model){
      if (err) {
        logger.error.info({ message: 'User FindOne Error', err: err });
        return;
      }
      res.render('index', { user: model.email, id: model.id});
    });
  }
};
