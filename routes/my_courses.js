module.exports = (app) => {
  app.get('/my_courses', (req, res) => {
    const auth_url = app.get('auth_url');

    console.log('#session#', req.session.user);
    if (1 || !req.session.user) {
      return res.redirect(auth_url);
    }
    res.render('my_courses', {
      title: '我的课程',
      tab: 'courses'
    });
  });
};
