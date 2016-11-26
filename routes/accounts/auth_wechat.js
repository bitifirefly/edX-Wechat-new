const OAuth = require('wechat-oauth');

module.exports = (app, UserModel) => {
  const wechat_data = app.get('settings').wechat;
  const client = new OAuth(wechat_data.appId, wechat_data.appSecret);

  app.get('/auth_wechat', (req, res) => {
    if (!req.query.code) {
      console.error('获取 code 失败');
      return;
    }
    client.getAccessToken(req.query.code, (err, token) => {
      // result.data: access_token, expires_in, refresh_token, openid
      if (!token.data) return;
      const openid = token.data.openid;
      console.log('#token#', openid);

      const promise = UserModel.findOne({ openid }).exec();
      promise.then(user => {
        if (!user) {
          console.log('#user null#', user);
          const newUser = new UserModel({ openid });
          return Promise.resolve(newUser.save());
        }
        console.log('#user success#', user);
        return user;
      }).then(user => {
        if (user) {
          console.log('#user then#', user);
          req.session.user = user;
          return res.redirect('/signin');
        }
      });
    });
  });
};
