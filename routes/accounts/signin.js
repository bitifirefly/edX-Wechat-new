const request = require('request');
const express = require('express');
const router = express.Router();
const { UserModel } = require('../../models');
const { isAccessTokenExpired, getAccessToken, updateAccessToken } = require('../../utils/helper');

router.get('/', (req, res) => {
  res.render('signin', {title: '用户登录'});
});

router.post('/', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log('#login user#', username, password);

  const openid = req.session.user.openid;
  getAccessToken(username, password)
    .then(token => {
      if (token.error_description) {
        console.log('#username or password incorrect#', token.error_description);
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
      console.log('#then success#', user);
      req.session.user = { openid: user.openid, access_token: user.access_token };
      return Promise.reject('success');
    }).catch(result => {
      console.log('#then err#', result);
      if (result === 'incorrect') {
        res.send('incorrect');
        return;
      }
      if (result === 'success') {
        res.send('success');
        return;
      }
    });
});

module.exports = router;
