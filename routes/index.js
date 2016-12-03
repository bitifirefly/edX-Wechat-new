const express = require('express');
const request = require('request');

const findCourseRouter = require('./find_courses');
const myCourseRouter = require('./my_courses');
const myVideosRouter = require('./my_videos');
const settingsRouter = require('./settings');
const signinRouter = require('./accounts/signin');
const authWechatRouter = require('./accounts/auth_wechat');

const authMiddleware = require('../middlewares/auth');
/*module.exports = (app) => {
  findCourseRouter(app, UserModel);
  myCourseRouter(app);
  myVideosRouter(app);
  settingsRouter(app);
  signinRouter(app, UserModel);
  authWechatRouter(app, UserModel);
};*/
module.exports = (app) => {
  app.use('/', findCourseRouter);
  app.use('/my_courses', authMiddleware, myCourseRouter);
  app.use('/my_videos', authMiddleware, myVideosRouter);
  app.use('/settings', settingsRouter);
  app.use('/auth_wechat', authWechatRouter);
  app.use('/signin', signinRouter);
};

/*
router.get('/', (req, res, next) => {
  console.log('#index');
  res.send('index');
});

router.use((req, res, next) => {
  console.log('hello');
  next();
});

router.get('/a', (req, res, next) => {
  console.log('#a');
  res.send('a');
});

router.use((req, res, next) => {
  console.log('world');
  next();
});

module.exports = router;*/

