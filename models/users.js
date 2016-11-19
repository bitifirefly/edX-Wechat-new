var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: String,
  access_token: String,
  expires_in: Date,
  refresh_token: String
});

var UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;
