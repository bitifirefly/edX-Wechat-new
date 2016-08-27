var path = require('path');
var env = process.env.NODE_ENV || 'production';
var rootPath = path.normalize(__dirname + '/..');

var config = {
  development: {
    name: 'development',
    root: rootPath,
    port: 3000,
    db: 'mongodb://localhost/mvc-development'
  },

  production: {
    name: 'production',
    root: rootPath,
    port: 80,
    db: 'mongodb://localhost/mvc-production'
  }
};

module.exports = config[env];