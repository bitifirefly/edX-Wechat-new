module.exports = (app) => {
  app.get('/my_videos', (req, res) => {
    res.render('my_videos', {
      title: '我的视频',
      tab: 'videos'
    });
  });
};
