const express = require('express');
const OAuth = require('wechat-oauth');
const config = require('./config/config');
const settings = require('./settings.json');

const app = express();
const client = new OAuth(settings.wechat.appId, settings.wechat.appSecret);
const auth_url = client.getAuthorizeURL(settings.wechat.redirectUrl, settings.wechat.state, settings.wechat.scope);
app.set('auth_url', auth_url);
app.set('settings', settings);

require('./config/express')(app, config);
require('./config/mongodb')();

app.listen(config.port, () => {
  console.log('Express server listening on port ' + config.port);
});
