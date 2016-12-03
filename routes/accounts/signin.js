const express = require('express');
const router = express.Router();
const { UserModel } = require('../../models');
const { getAccessToken } = require('../../utils/helper');

router.get('/', (req, res) => {
  res.render('signin', {title: '用户登录'});
});

router.post('/', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const openid = req.session.user.openid;

  getAccessToken(username, password)
    .then(token => {
      if (token.error_description) {
        return Promise.reject('incorrect');
      }
      const newUser = new UserModel({
        openid,
        access_token: token.access_token,
        expires_in: token.expires_in,
        refresh_token: token.refresh_token
      });
      return newUser.save();
    }).then(user => {
      req.session.user = { openid: user.openid, access_token: user.access_token };
      return Promise.reject('success');
    }).catch(result => {
      if (result === 'incorrect') {
        return res.send('incorrect');
      }
      if (result === 'success') {
        return res.send('success');
      }
    });
});

module.exports = router;
