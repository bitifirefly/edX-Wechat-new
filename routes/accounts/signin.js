/**
 * 登录路由管理
 */
var request = require('request');

function getAccessToken(User, username, password) {
  var getTokenUrl = 'https://e.edustack.org/oauth2/access_token';
  var getTokenOptions = {
    client_id: 'fdda3d0d647212c22cdf',
    client_secret: 'd6f9c6e66062b7f599e93e8d1829b25d52627fef',
    // username: 'uniquexiaobai',
    // password: 'edx411324',
    grant_type: 'password',
    username: username,
    password: password
  };

  request.post({url: getTokenUrl, form: getTokenOptions}, function(err, response, token) {
    if(err || response.statusCode !== 200) return;
    token = JSON.parse(token);
    /*var options = {
      url: 'http://e.edustack.org/api/user/v1/accounts/uniquexiaobai',
      headers: {
        'Authorization': 'Bearer ' + token.access_token
      }
    };
    request(options, function(e, response, user) {
      console.log('user', user);
    });*/
    var user = new User({
      username: username,
      access_token: token.access_token,
      expires_in: new Date(token.expires_in + Date.now()),
      refresh_token: token.refresh_token
    });
    user.save()
      .then(function(doc) {
        if(doc) console.log('### access_token save success');
      })
      .then(function(err) {
        if(err) console.log(err);
      });
  });
}

function isAccessTokenExpired(expires_in) {
  return expires_in - new Date() >= 3600000;
}

function updateAccessTokenExpired(User, refresh_token) {
  var getTokenUrl = 'https://e.edustack.org/oauth2/access_token';
  var updateTokenOptions = {
    client_id: 'fdda3d0d647212c22cdf',
    client_secret: 'd6f9c6e66062b7f599e93e8d1829b25d52627fef',
    grant_type: 'refresh_token',
    refresh_token: refresh_token
  };

  request.post({url: getTokenUrl, form: updateTokenOptions}, function(err, response, token) {
    if(err || response.statusCode !== 200) return;
    token = JSON.parse(token);
    token.expires_in = new Date(token.expires_in + Date.now());
    User.update(
      {refresh_token: refresh_token},
      {$set: {refresh_token: token.refresh_token, access_token: token.access_token, expires_in: token.expires_in}}
    ).then(function(doc) {
      if(doc) console.log(doc);
    }).then(function(err) {
      if(err) console.log(err);
    });
  });
}

module.exports = function(app, User) {
  app.post('/signin', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({username: username})
      .then(function(user) {
        if(!user) {
          console.log('!user');
          getAccessToken(User, username, password);
        }
        if(user.expires_in && !isAccessTokenExpired(user.expires_in)) {
          updateAccessTokenExpired(User, user.refresh_token);
        }
        console.log('### signin success');
      })
      .then(function(err) {
        if(err) console.log(err);
      });
  });

  app.get('/signin', function(req, res) {
    res.render('accounts/signin', {
      title: 'signin'
    });
  });
};
