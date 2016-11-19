var express = require('express');
var config = require('./config/config');
var settings = require('./settings.json');

var app = express();
app.set('settings', settings);

require('./config/express')(app, config);
require('./config/mongodb')();

app.listen(config.port, function() {
  console.log('Express server listening on port ' + config.port);
});
