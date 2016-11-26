const mongoose = require('mongoose');

const config = require('./config');
const mongoUri = config.db;

module.exports = () => {
  mongoose.connect(mongoUri);
  const db = mongoose.connection;
  
  db.on('error', console.error.bind(console, '#db# database connect error !'));
  db.once('open', () => console.log('#db#', 'database connect success !'));
};
