const findCourseRouter = require('./find_courses');
const myCourseRouter = require('./my_courses');
const myVideosRouter = require('./my_videos');
const settingsRouter = require('./settings');
const signinRouter = require('./accounts/signin');
const authWechatRouter = require('./accounts/auth_wechat');
const authMiddleware = require('../middlewares/auth');

module.exports = (app) => {
  app.use('/', findCourseRouter);
  app.use('/my_courses', authMiddleware, myCourseRouter);
  app.use('/my_videos', authMiddleware, myVideosRouter);
  app.use('/settings', settingsRouter);
  app.use('/signin', signinRouter);
  app.use('/auth_wechat', authWechatRouter);
};
