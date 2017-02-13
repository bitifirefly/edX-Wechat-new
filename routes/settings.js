const express = require('express');
const router = express.Router();
const { getUserAccountInfo } = require('../utils/helper');

router.get('/', (req, res) => {
  getUserAccountInfo('1860abbc17ae3503945792239a083edf38cb72d8', 'uniquexiaobai')
    .then(user => {
      res.render('settings', {
        title: '设置',
        user: user
      });
    });
});

module.exports = router;
