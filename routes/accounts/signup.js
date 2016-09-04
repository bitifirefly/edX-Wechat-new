/**
 * 注册路由管理
 */

module.exports = function(app) {

  app.get('/signup', function(req, res) {
    res.render('accounts/signup', {
      title: 'signup'
    });
  });

};
