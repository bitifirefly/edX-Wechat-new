const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('settings', {
    title: '设置',
    tab: 'settings'
  });
});

module.exports = router;
