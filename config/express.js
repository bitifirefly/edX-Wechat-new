const express = require('express');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const router = require('../routes');

module.exports = (app, config) => {
  app.set('views', config.root + '/views/');
  app.set('view engine', 'ejs');

  // app.use(favicon(config.root + '/public/img/dist/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(compression());
  app.use(express.static(config.root + '/public'));
  app.use(session({
    key: 'edx_session_id',
    secret: 'edx',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    })
  }));

  router(app);

  app.use((req, res) => {
    res.render('not_found');
  });

  if (config.name === 'development') {
    app.use((err, req, res, next) => {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  }
};
