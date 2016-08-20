var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var compression = require('compression');

module.exports = function(app, config) {

  app.set('views', config.root + '/views');
  app.set('view engine', 'ejs');

  // app.use(favicon(config.root + '/public/img/dist/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());
  app.use(compression());
  app.use(express.static(config.root + '/public'));

  var router = require('../routes/router');
  router(app);

  app.use(function(req, res) {
    res.render('not-found');
  });

  if(config.name === 'development'){
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  }

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {},
      title: 'error'
    });
  });

};
