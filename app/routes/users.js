'use strict';

var logger = require('../libs/logger');
var User = require('../model').User;
var guid = require('../libs/guid');


module.exports = {
  post: function(req, res){
    if (!req.body.id) {
      req.body.id = guid();
    }
    var newUser = new User(req.body);
    newUser.save(function(err){
      if (err) {
        logger.error.info({ message: 'Save newUser Error', err: err });
        res.redirect('back');
      } else {
        res.render('index', { user: newUser.email, id: newUser.id});
      }
    });
  },
  delete: function(req, res){
    var query = { 'id': req.url.split('/')[2] };
    User.findOne(query, function(err, model){
      if (err) {
        logger.error.info({ message: 'User Find Error', err: err });
        res.json({ 'message': 'error' });
      }
      if (!model) {
        res.json({ 'message': 'error' });
      }
      model.remove(function(err){
        if (err) {
          logger.error.info({ message: 'User Remove Error', err: err });
          res.json({ 'message': 'error' });
        }
        req.session.destroy();
        res.json({ 'message': 'success' });
      });
    });
  }
};
