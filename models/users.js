/**
 * 数据库集合、方法定义
 */

var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: String,
  password: String,
  access_token: String,
  expires_in: Number,
  refresh_token: String
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
