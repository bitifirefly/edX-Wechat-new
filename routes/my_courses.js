const express = require('express');
const router = express.Router();
const { getEnrolledCourseList } = require('../utils/edx_service');

router.get('/', (req, res) => {
  const access_token = req.session.user.access_token;

  getEnrolledCourseList(access_token)
    .then((courseList) => {
      res.render('my_courses', {
        title: '我的课程',
        courseList: courseList || []
      });
    });
});

module.exports = router;
