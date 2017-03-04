const express = require('express');
const router = express.Router();
const { UserModel } = require('../../models');
const { getAccessToken } = require('../../utils/edx_service');

router.get('/', (req, res) => {
  res.render('signin', { title: '用户登录' });
});

router.post('/', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const openid = req.session.user.openid;

  getAccessToken(username, password)
    .then(token => {
      if (token.error_description) {
        return Promise.reject({
          notRealPromiseException: true,
          data: 'incorrect'
        });
      }
      const newUser = new UserModel({
        openid,
        access_token: token.access_token,
        expires_in: token.expires_in,
        refresh_token: token.refresh_token
      });
      return newUser.save();
    }).then(user => {
      req.session.user.access_token = user.access_token;
      return Promise.reject({
        notRealPromiseException: true,
        data: 'success'
      });
    }).catch(err => {
      if (err.notRealPromiseException) {
        if (err.data === 'success') res.send('success');
        if (err.data === 'incorrect') res.send('incorrect');
      } else {
        next(err);
      }
    });
});

module.exports = router;
