/**
 * 路由汇集
 */
var request = require('request');

var User = require('../models/users');

var signin = require('./accounts/signin');

module.exports = function(app) {

  signin(app, User);

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
