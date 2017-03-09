const express = require('express');
const router = express.Router();
const { getCourseDetailById } = require('../utils/edx_service');

router.get('/', (req, res, next) => {
  getCourseDetailById(req.query.id)
    .then((course) => {
      res.render('course_detail', {
        title: '课程详情',
        course: course
      });
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
