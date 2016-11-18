var request = require('request');

module.exports = function(app, User) {
  app.post('/signin', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    console.log(username, password);

    // User.findOne({username: username})
    //   .then(function(user) {
    //     if(!user) {
    //       console.log('!user');
    //       getAccessToken(User, username, password);
    //     }
    //     if(user.expires_in && !isAccessTokenExpired(user.expires_in)) {
    //       updateAccessTokenExpired(User, user.refresh_token);
    //     }
    //     console.log('### signin success');
    //     res.redirect('/');
    //   })
    //   .then(function(err) {
    //     if(err) console.log(err);
    //   });
  });

  app.get('/signin', function(req, res) {
    res.render('accounts/signin', {
      title: 'signin'
    });
  });
};
