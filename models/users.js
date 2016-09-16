/**
 * 数据库集合、方法定义
 */

var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: String,
  access_token: String,
  expires_in: Date,
  refresh_token: String
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
