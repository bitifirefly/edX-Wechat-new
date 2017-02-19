const express = require('express');
const request = require('request');
const router = express.Router();

router.get('/', (req, res) => {
  const page = ~~req.query.page || 1;
  const lastPage = page === 1 ? page : page - 1;
  const nextPage = page + 1;
  const url = 'http://x.edustack.org/api/courses/v1/courses/?page=' + page;

  request.get(url, (err, response, body) => {
    if(!err && response.statusCode == 200) {
      const courseList = JSON.parse(body).results;
      
      res.render('find_courses', {
        title: '发现课程',
        courseList: courseList || [],
        lastPage: lastPage,
        nextPage: nextPage
      });
    }
  });
});

module.exports = router;
