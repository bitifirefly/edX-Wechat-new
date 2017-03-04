const OAuth = require('wechat-oauth');

const settings = require('../settings.json');
const { UserModel } = require('../models');
const { isAccessTokenExpired, updateAccessToken } = require('../utils/edx_service');

const client = new OAuth(settings.wechat.appId, settings.wechat.appSecret);
const wechat_auth_url = client.getAuthorizeURL(settings.wechat.redirectUrl, settings.wechat.state, settings.wechat.scope);

module.exports = (req, res, next) => {
  if (!req.session.user || !req.session.user.openid) {
    return res.redirect(wechat_auth_url);
  }

  if (req.session.user.access_token) {
    return next();
  }

  const openid = req.session.user.openid;
  let u;
  UserModel.findUserByOpenid(openid)
    .then(user => {
      if (!user || !user.access_token) {
        return Promise.reject({
          notRealPromiseException: true,
          data: 'signin'
        });
      }

      if (isAccessTokenExpired(user.expires_in)) {
        u = user;
        return updateAccessToken(user.refresh_token);
      }

      return Promise.reject({
        notRealPromiseException: true,
        data: 'next'
      });
    })
    .then(token => {
      u.access_token = token.access_token;
      u.expires_in = token.expires_in;
      u.refresh_token = token.refresh_token;

      return u.save();
    })
    .then(() => Promise.reject({
      notRealPromiseException: true,
      data: 'next'
    }))
    .catch(err => {
      if (err.notRealPromiseException) {
        if (err.data === 'signin') res.redirect('/signin');
        if (err.data === 'next') next();
      } else {
        next(err);
      }
    });
};
