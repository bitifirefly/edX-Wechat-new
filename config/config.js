const path = require('path');

const env = process.env.NODE_ENV || 'production';
const rootPath = path.normalize(__dirname + '/..');

const config = {
  development: {
    name: 'development',
    root: rootPath,
    port: 3000,
    db: 'mongodb://localhost/edx-development'
  },

  production: {
    name: 'production',
    root: rootPath,
    port: 80,
    db: 'mongodb://localhost/edx-production'
  }
};

module.exports = config[env];
