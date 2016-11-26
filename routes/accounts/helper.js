const request = require('request');
const settings = require('../../settings.json');

const { client_id, client_secret } = settings.edx;

module.exports = {
  getAccessToken: getAccessToken,
  isAccessTokenExpired: isAccessTokenExpired,
  updateAccessToken: updateAccessToken
};

function getAccessToken(User, username, password) {
  const getTokenUrl = 'https://x.edustack.org/oauth2/access_token';
  const getTokenOptions = {
    client_id: client_id,
    client_secret: client_secret,
    grant_type: 'password',
    username: username,
    password: password
  };

  return new Promise((resolve, reject) => {
    request.post({url: getTokenUrl, form: getTokenOptions}, (err, res, token) => {
      console.log('#test error#', err, res.statusCode);
      // when username or password incorrect, res.statusCode === 400 && err === null
      // && token.error_description === {err_description, error}
      if (err) reject(err);
      token = JSON.parse(token);
      resolve(token);
      
      /*const options = {
        url: 'http://e.edustack.org/api/user/v1/accounts/uniquexiaobai',
        headers: {
          'Authorization': 'Bearer ' + token.access_token
        }
      };
      token = JSON.parse(token);
        request(options, (e, res, user) => {
        if(err || res.statusCode !== 200) return reject(err);
        console.log('#edx_user#', user);
      });*/
    });
  });
}

function isAccessTokenExpired(expires_in) {
  return expires_in - new Date() >= 3600000;
}

function updateAccessToken(User, refresh_token) {
  const getTokenUrl = 'https://x.edustack.org/oauth2/access_token';
  const updateTokenOptions = {
    client_id: client_id,
    client_secret: client_secret,
    grant_type: 'refresh_token',
    refresh_token: refresh_token
  };

  return new Promise((resolve, reject) => {
    request.post({url: getTokenUrl, form: updateTokenOptions}, function(err, res, token) {
      if(err) reject(err);
      token = JSON.parse(token);
      token.expires_in = new Date(token.expires_in + Date.now());
      resolve(token);
      /*User.update(
        {refresh_token: refresh_token},
        {$set: {refresh_token: token.refresh_token, access_token: token.access_token, expires_in: token.expires_in}}
      ).then(function(doc) {
        if(doc) console.log(doc);
      }).then(function(err) {
        if(err) console.log(err);
      });*/
    });
  }); 
  
}
