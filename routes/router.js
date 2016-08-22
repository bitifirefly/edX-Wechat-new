var request = require('request');

module.exports = function(app) {

  app.get('/', function(req, res) {
    var url = 'http://courses.edx.org/api/courses/v1/courses/';
    request(url, function(err, response, result) {
      if(!err && response.statusCode == 200) {
        res.render('index', {
          courses: result,
          title: 'hello world'
        });
      }
    });
  });

  app.get('/signup', function(req, res) {
    res.render('signup');
  });

  app.get('/signin', function(req, res) {
    res.render('signin');
  });

};
