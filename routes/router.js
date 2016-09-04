var request = require('request');

module.exports = function(app) {

  app.get('/', function(req, res) {
    var page = ~~req.query.page || 1;
    var lastPage = page === 1 ? page : page - 1;
    var nextPage = page + 1;
    var url = 'http://x.edustack.org/api/courses/v1/courses/?page=' + page;
    request.get(url, function(err, response, body) {
      if(!err && response.statusCode == 200) {
        var courses = JSON.parse(body).results;
        res.render('courses/courses-find', {
          title: '发现课程',
          courses: courses,
          lastPage: lastPage,
          nextPage: nextPage
        });
      }
    });
  });

  app.get('/signup', function(req, res) {
    res.render('accounts/signup', {
      title: 'signup'
    });
  });

  app.get('/signin', function(req, res) {
    var url = 'https://e.edustack.org/oauth2/access_token';
    var options = {
      client_id: 'fdda3d0d647212c22cdf',
      client_secret: 'd6f9c6e66062b7f599e93e8d1829b25d52627fef',
      grant_type: 'password',
      username: 'uniquexiaobai',
      password: 'edx411324'
    };
    request.post({url: url, form: options}, function(e, response, body) {
      var auth = JSON.parse(body);
      var options = {
        url: 'http://e.edustack.org/api/user/v1/accounts/uniquexiaobai',
        headers: {
          'Authorization': 'Bearer ' + auth.access_token
        }
      };
      request(options, function(e, response, user) {
        console.log('user', user);
      });

    });

    res.render('accounts/signin', {
      title: 'signin'
    });
  });

  app.get('/courses-me', function(req, res) {
    res.render('courses/courses-me', {
      title: '我的课程',
      tab: 'courses'
    });
  });

  app.get('/videos-me', function(req, res) {
    res.render('courses/videos-me', {
      title: '我的视频',
      tab: 'videos'
    });
  });

  app.get('/settings', function(req, res) {
    res.render('courses/settings', {
      title: '设置',
      tab: 'settings'
    });
  });

};
