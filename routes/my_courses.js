const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('my_courses', {
    title: '我的课程',
    tab: 'courses'
  });
});

module.exports = router;
