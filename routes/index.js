const findCoursesRouter = require('./find_courses');
const CourseDetailRouter = require('./course_detail');
const myCoursesRouter = require('./my_courses');
const settingsRouter = require('./settings');
const signinRouter = require('./accounts/signin');
const authWechatRouter = require('./accounts/auth_wechat');
const authEdxMiddleware = require('../middlewares/auth_edx');

module.exports = (app) => {
  app.use('/', findCoursesRouter);
  app.use('/course_detail', CourseDetailRouter);
  app.use('/auth_wechat', authWechatRouter);
  app.use('/signin', signinRouter);
  app.use(authEdxMiddleware);
  app.use('/my_courses', myCoursesRouter);
  app.use('/settings', settingsRouter);
};
