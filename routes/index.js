var request = require('request');

var { UserModel } = require('../models');

var findCourseRouter = require('./find_courses');
var myCourseRouter = require('./my_courses');
var myVideosRouter = require('./my_videos');
var settingsRouter = require('./settings');
var signinRouter = require('./accounts/signin');
var authWechatRouter = require('./accounts/auth_wechat');

module.exports = function(app) {
  findCourseRouter(app);
  myCourseRouter(app);
  myVideosRouter(app);
  settingsRouter(app);
  signinRouter(app, UserModel);
  authWechatRouter(app);
};
