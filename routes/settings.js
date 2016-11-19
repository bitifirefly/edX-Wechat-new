module.exports = function(app) {
  app.get('/settings', function(req, res) {
    res.render('settings', {
      title: '设置',
      tab: 'settings'
    });
  });
};
