const OAuth = require('wechat-oauth');
const express = require('express');
const router = express.Router();
const settings = require('../../settings.json');

const client = new OAuth(settings.wechat.appId, settings.wechat.appSecret);

router.get('/', (req, res) => {
  if (req.session.referer) {
    req.headers['referer'] = req.session.referer;
  }
  console.log('#referer#', req.headers['referer']);
  if (!req.query.code) {
    console.error('获取 code 失败');
    return;
  }
  client.getAccessToken(req.query.code, (err, token) => {
    // result.data: access_token, expires_in, refresh_token, openid
    if (!token.data) return;
    const openid = token.data.openid;
    console.log('#wechat_token#', token.data);
    req.session.user = { openid: openid };
    res.redirect('back');
  });
});

module.exports = router;
