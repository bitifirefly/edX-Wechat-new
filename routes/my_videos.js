module.exports = function(app) {
  app.get('/my_videos', function(req, res) {
    res.render('my_videos', {
      title: '我的视频',
      tab: 'videos'
    });
  });
};
