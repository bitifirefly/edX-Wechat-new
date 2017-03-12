const express = require('express');
const router = express.Router();
const { getCourseChapterList } = require('../utils/edx_service');

router.get('/', (req, res, next) => {
  const access_token = req.session.user.access_token;
  const course_id = req.query.course_id;

  getCourseChapterList(access_token, course_id, 'zen')
    .then(chapterList => {
      res.render('chapter_list', {
        title: '章节列表',
        chapterList: chapterList
      });
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
