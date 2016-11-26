module.exports = (app) => {
  app.get('/settings', (req, res) => {
    res.render('settings', {
      title: '设置',
      tab: 'settings'
    });
  });
};
