/**
 * 数据库连接配置
 */

var mongoose = require('mongoose');

var mongoUri = 'mongodb://localhost/edx';

module.exports = function() {
  mongoose.connect(mongoUri);
  mongoose.connection.on('error', console.error.bind(console, '### database connect error !'));
};
