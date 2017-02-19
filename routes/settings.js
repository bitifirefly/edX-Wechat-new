const express = require('express');
const router = express.Router();
const { getUserAccountInfo } = require('../utils/edx_service');

router.get('/', (req, res) => {
  const access_token = req.session.user.access_token;
  
  getUserAccountInfo(access_token)
    .then(user => {
      res.render('settings', {
        title: '设置',
        user: user
      });
    });
});

module.exports = router;
