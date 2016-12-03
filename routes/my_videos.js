const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('my_videos', {
    title: '我的视频',
    tab: 'videos'
  });
});

module.exports = router;
