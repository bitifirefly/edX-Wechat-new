var request = require('request');

module.exports = function(app) {

  app.get('/', function(req, res) {
    var page = ~~req.query.page || 1;
    var lastPage = page === 1 ? page : page - 1;
    var nextPage = page + 1;
    console.log(typeof page, lastPage, nextPage);
    var url = 'http://x.edustack.org/api/courses/v1/courses/?page=' + page;
    request.get(url, function(err, response, body) {
      if(!err && response.statusCode == 200) {
        var courses = JSON.parse(body).results;
        res.render('index', {
          title: 'edX',
          courses: courses,
          lastPage: lastPage,
          nextPage: nextPage
        });
      }
    });

  });

  app.get('/signup', function(req, res) {
    res.render('signup', {
      title: 'signup'
    });
  });

  app.get('/signin', function(req, res) {
    res.render('signin', {
      title: 'signin'
    });
  });

};
