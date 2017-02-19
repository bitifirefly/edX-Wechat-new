const request = require('request');
const settings = require('../settings.json');

const { client_id, client_secret } = settings.edx;

module.exports = {
  getAccessToken: getAccessToken,
  isAccessTokenExpired: isAccessTokenExpired,
  updateAccessToken: updateAccessToken,
  getUserAccountInfo: getUserAccountInfo,
  getEnrolledCourseList: getEnrolledCourseList
};

function getEnrolledCourseList(access_token) {
  const requestUrl = 'https://x.edustack.org/api/enrollment/v1/enrollment';
  const options = {
    url: requestUrl,
    headers: {
      'Authorization': 'Bearer ' + access_token
    }
  };

  return new Promise((resolve, reject) => {
    let arr = [];

    request(options, (err, res, enrolledCourses) => {
      if (!err && res.statusCode === 200) {
        enrolledCourses = JSON.parse(enrolledCourses);

        enrolledCourses.forEach((course) => {
          arr.push(findCourseDetailById(course.course_details.course_id));
        });
        resolve(Promise.all(arr));
      }
    });
  });
}

function findCourseDetailById(courseId) {
  return new Promise((resolve, reject) => {
    const courseUrl = 'https://x.edustack.org/api/courses/v1/courses/' + courseId;
    
    request(courseUrl, (err, res, course) => {
      if (!err && res.statusCode === 200) {
        resolve(JSON.parse(course));
      }
    });
  });
}

function getUserAccountInfo(access_token) {
  const requestUrl = 'https://x.edustack.org/api/user/v1/accounts';
  const options = {
    url: requestUrl,
    headers: {
      'Authorization': 'Bearer ' + access_token
    }
  };

  return new Promise((resolve, reject) => {
    request(options, (err, res, user) => {
      if(err || res.statusCode !== 200) reject(err);
      resolve(JSON.parse(user)[0]);
    });
  });
}

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
