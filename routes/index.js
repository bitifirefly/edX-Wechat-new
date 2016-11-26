const request = require('request');

const { UserModel } = require('../models');

const findCourseRouter = require('./find_courses');
const myCourseRouter = require('./my_courses');
const myVideosRouter = require('./my_videos');
const settingsRouter = require('./settings');
const signinRouter = require('./accounts/signin');
const authWechatRouter = require('./accounts/auth_wechat');

module.exports = (app) => {
  findCourseRouter(app, UserModel);
  myCourseRouter(app);
  myVideosRouter(app);
  settingsRouter(app);
  signinRouter(app, UserModel);
  authWechatRouter(app, UserModel);
};
