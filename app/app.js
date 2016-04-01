'use strict';

var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');

var app = express();

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// for session
var expressSession = require('express-session');
var loginCheck = require('./libs/loginCheck');

// routing
var routes = require('./routes');

// config
var config = require('config');

// default logger
var logger = require('./libs/logger');
app.use(logger.express);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// for session
app.use(cookieParser());
app.use(expressSession({
  secret: config.get('sessionSecret'),
  resave: true,
  saveUninitialized: true
}));

// routing
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', loginCheck, routes.index.get);
app.get('/login', routes.login.get);
app.post('/users', routes.users.post);
app.get('/users/:id/delete', routes.users.delete);
app.get('/logout', routes.logout.get);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
