var express = require('express');
var glob = require('glob');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');
var session = require('cookie-session');
var authUtil = require('../utils/authutil.js');

module.exports = function(app, config) {
  app.set('views', config.root + '/app/views');
  app.set('view engine', 'jade');

  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(session({
    keys: ['sessionSeqKey', 'sessionSeqKey2']
  }));
  app.use(cookieParser());
  app.use(compress());
  app.use(express.static(config.root + '/public'));
  app.use(methodOverride());

  var checkAuth = function(req, res, next) {
    if(authUtil.isMaster(req)) {
      next();
    } else {
      if(authUtil.isAuthorized(req)) {
        res.status(403).send('you are not master');
      } else {
        res.status(401).send('google oauth request');
      }
    }
  };

  app.post('/api/*', function(req, res, next) {
    checkAuth(req, res, next);
  });

  app.delete('/api/*', function(req, res, next) {
    checkAuth(req, res, next);
  });

  var controllers = glob.sync(config.root + '/app/controllers/**/*.js');
  controllers.forEach(function (controller) {
    var exp = require(controller);
    require(controller)(app);
  });

  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  if(app.get('env') === 'development'){
    app.use(function (err, req, res) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  }

  app.use(function (err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {},
      title: 'error'
    });
  });

};

