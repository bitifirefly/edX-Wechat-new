const express = require('express');
const router = express.Router();
const { getCourseChapterList } = require('../utils/edx_service');

router.get('/', (req, res) => {
  const access_token = req.session.user.access_token;
  const course_id = req.query.course_id;

  getCourseChapterList(access_token, course_id, 'zen')
    .then(chapterList => {
      console.log('ok', chapterList);
    })
    .catch(err => {
      console.log('err', err);
    });
    
  res.render('block_list', {
    title: '章节列表'
  });
});

module.exports = router;
