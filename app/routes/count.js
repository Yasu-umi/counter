'use strict';

var logger = require('../libs/logger');
var User = require('../model').User;
var Count = require('../model').Count;


module.exports = {
  get: function(req, res){
    if (!req.query.userId){
      logger.error.info({ message: 'Count Query Error', err: req.body });
      res.json({ 'message': 'error' });
      return;
    }
    var query = { userId: req.query.userId };
    Count.find(query, function(err, counts){
      if (err){
        logger.error.info({ message: 'Count Find Error', err: err });
        res.json({ 'message': 'error' });
        return;
      }
      counts.forEach(function(count, index){
        counts[index] = { userId: count.userId, name: count.name, created: count.created };
      });
      res.json({ 'message': 'success', 'counts': counts });
    });
  },
  post: function(req, res){
    // parameters existing check
    if (!req.body.userId || !req.body.name || !req.body.created){
      logger.error.info({ message: 'Count Validation Error', err: req.body });
      res.json({ 'message': 'error' });
      return;
    }
    var query = { id: req.body.userId };
    User.find(query, function(err, users){
      if (err || users.length === 0){
        logger.error.info({ message: 'User Find Error', err: err || 'Not Found User' });
        res.json({ 'message': 'error' });
        return;
      }
      var newCount = new Count(req.body);
      newCount.save(function(err){
        if (err){
          logger.error.info({ message: 'Save newCount Error', err: err });
          res.json({ 'message': 'error' });
          return;
        }
        res.json({ 'message': 'success' });
      });
    });
  }
};
