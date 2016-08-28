var request = require('request');

module.exports = function(app) {

  app.get('/', function(req, res) {
    res.render('index', {
      title: '发现课程',
      tab: 'index'
    });
  });

  app.get('/courses', function(req, res) {
    var page = ~~req.query.page || 1;
    var lastPage = page === 1 ? page : page - 1;
    var nextPage = page + 1;
    var url = 'https://courses.edx.org/api/courses/v1/courses/?page=' + page;
    request.get(url, function(err, response, body) {
      if(!err && response.statusCode == 200) {
        var courses = JSON.parse(body).results;
        res.render('courses', {
          title: '发现课程',
          courses: courses,
          lastPage: lastPage,
          nextPage: nextPage
        });
      }
    });

  });

  app.get('/signup', function(req, res) {
    res.render('signup', {
      title: 'signup'    });
  });

  app.get('/signin', function(req, res) {
    res.render('signin', {
      title: 'signin'
    });
  });

  app.get('/courses-me', function(req, res) {
    res.render('courses-me', {
      title: '我的课程',
      tab: 'courses'
    });
  });

  app.get('/videos-me', function(req, res) {
    res.render('videos-me', {
      title: '我的视频',
      tab: 'videos'
    });
  });

  app.get('/settings', function(req, res) {
    res.render('settings', {
      title: '设置',
      tab: 'settings'
    });
  });

};
