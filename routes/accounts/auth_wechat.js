var OAuth = require('wechat-oauth');

module.exports = function(app) {
  var wechat_data = app.get('settings').wechat;
  var client = new OAuth(wechat_data.appId, wechat_data.appSecret);
  var url = client.getAuthorizeURL(wechat_data.redirectUrl, wechat_data.state, wechat_data.scope);

  app.get('/auth_wechat', function(req, res) {
    // console.log('#url#', url);
    // console.log('#/wechat#', req.query);
    client.getAccessToken(req.query.code, function (err, result) {
      // var accessToken = result.data.access_token;
      // var openid = result.data.openid;
      console.log('#openid#', result);
    });
  });
};
