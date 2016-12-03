const request = require('request');
const settings = require('../settings.json');

const { client_id, client_secret } = settings.edx;

module.exports = {
  getAccessToken: getAccessToken,
  isAccessTokenExpired: isAccessTokenExpired,
  updateAccessToken: updateAccessToken
};

function getAccessToken(username, password) {
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
      // when username or password incorrect, res.statusCode === 400 && err === null
      // && token.error_description === {err_description, error}
      if (err) reject(err);
      token = JSON.parse(token);
      if (token.expires_in) {
        token.expires_in = new Date(token.expires_in + Date.now());
        console.log(token.expires_in);
      }
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
  return expires_in - new Date() <= 3600000;
}

function updateAccessToken(refresh_token) {
  const updateTokenUrl = 'https://x.edustack.org/oauth2/access_token';
  const updateTokenOptions = {
    client_id: client_id,
    client_secret: client_secret,
    grant_type: 'refresh_token',
    refresh_token: refresh_token
  };

  return new Promise((resolve, reject) => {
    request.post({url: updateTokenUrl, form: updateTokenOptions}, function(err, res, token) {
      if(err) reject(err);
      token = JSON.parse(token);
      if (token.expires_in) {
        token.expires_in = new Date(token.expires_in + Date.now());
      }
      resolve(token);
    });
  }); 
  
}
