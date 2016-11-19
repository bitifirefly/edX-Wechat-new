module.exports = function(app) {
  app.get('/my_courses', function(req, res) {
    res.render('my_courses', {
      title: '我的课程',
      tab: 'courses'
    });
  });
};
