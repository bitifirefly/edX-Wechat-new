const request = require('request');

const helper = require('./helper');

module.exports = (app, UserModel) => {
  app.get('/signin', (req, res) => {
    const openid = req.session.user.openid;

    const promise = UserModel.findOne({ openid }).exec();
    promise.then(user => {
      if (user.access_token) {
        return res.redirect('/');
      }
      res.render('signin', {
        title: '用户登录'
      });
    });
  });

  app.post('/signin', (req, res) => {
    const openid = req.session.user.openid;
    const username = req.body.username;
    const password = req.body.password;
    console.log('#user#', username, password);

    /*helper.getAccessToken(UserModel, 'uniquexiaobai', 'edx411324', (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log('#result#', result);
    });*/
    helper.getAccessToken(UserModel, username, password)
      .then(token => {
        if (token.error_description) {
          console.log('#username or password incorrect#', token.error_description);
          return res.send('incorrect');
        }
        console.log('#result#', token.error_description);
        return res.send('success');
      })
      .catch(err => {
        console.error('#get edx token error#', err);
      });
  });
};
