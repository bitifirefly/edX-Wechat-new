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
  UserModel.findOne({ openid: openid }).exec()
    .then(user => {
      if (!user || !user.access_token) {
        return Promise.reject('signin');
      }
      if (isAccessTokenExpired(user.expires_in)) {
        updateAccessToken(user.refresh_token)
          .then(token => {
            user.access_token = token.access_token;
            user.expires_in = token.expires_in;
            user.refresh_token = token.refresh_token;
            return user.save();
          });
      } else {
        return Promise.reject('next');
      }
    })
    .then(user => {
      if (user) {
        req.session.user.access_token = user.access_token;
        return next();
      }
    }).catch(result => {
      if (result === 'signin') {
        return res.redirect('/signin');
      }
      if (result === 'next') {
        return next();
      }
    });
};
