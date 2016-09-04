/**
 * 登录路由管理
 */

var request = require('request');

module.exports = function(app, User) {

  app.post('/signin', function(req, res) {
    var name = req.body.name;
    var password = req.body.password;

    User.findOne({name: name}, function(err, user) {
      if(err) {
        console.log(err);
      }
      if(user.password !== password) {
        res.end('密码不正确');
      }
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

    // request.post({url: url, form: options}, function(e, response, body) {
    //   var auth = JSON.parse(body);
    //   var options = {
    //     url: 'http://e.edustack.org/api/user/v1/accounts/uniquexiaobai',
    //     headers: {
    //       'Authorization': 'Bearer ' + auth.access_token
    //     }
    //   };
    //   request(options, function(e, response, user) {
    //     console.log('user', user);
    //   });
    // });

    res.render('accounts/signin', {
      title: 'signin'
    });
  });

};
