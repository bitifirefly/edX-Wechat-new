const { getAccessToken } = require('../utils/edx_service');

module.exports = (req, res, next) => {
  if (!req.session.user || !req.session.user.access_token) {
    const username = 'zen';
    const password = 'zengzheng';
    
    getAccessToken(username, password)
      .then(token => {
        req.session.user = { access_token: token.access_token };
        next();
      }).catch(err => {
        next(err);
      });
  } else {
    next();
  }
};
