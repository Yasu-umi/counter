'use strict';

var logger = require('../libs/logger');
var User = require('../model').User;
var guid = require('../libs/guid');


module.exports = {
  post: function(req, res){
    // generate id
    req.body.id = guid();
    // parameters existing check
    if (!req.body.email || !req.body.password || !req.body.id) {
      logger.error.info({ message: 'User Validation Error', err: req.body });
      res.json({ 'message': 'error' });
        return;
    }
    var query = { email: req.body.email };
    User.find(query, function(err, models){
      if (err){
        logger.error.info({ message: 'User Find Error', err: err });
        res.json({ 'message': 'error' });
        return;
      }
      // already parameters existing check
      if (models.length !== 0){
        res.json({ 'message': 'error' });
        return;
      }
      var newUser = new User(req.body);
      newUser.save(function(err){
        if (err){
          logger.error.info({ message: 'Save newUser Error', err: err });
          res.json({ 'message': 'error' });
          return;
        }
        res.json({ 'message': 'success' });
      });
    });
  },
  delete: function(req, res){
    var query = { 'id': req.url.split('/')[2] };
    User.findOne(query, function(err, model){
      if (err){
        logger.error.info({ message: 'User Find Error', err: err });
        res.json({ 'message': 'error' });
        return;
      }
      if (!model){
        res.json({ 'message': 'error' });
        return;
      }
      model.remove(function(err){
        if (err){
          logger.error.info({ message: 'User Remove Error', err: err });
          res.json({ 'message': 'error' });
          return;
        }
        req.session.destroy(function(){});
        res.json({ 'message': 'success' });
      });
    });
  }
};
