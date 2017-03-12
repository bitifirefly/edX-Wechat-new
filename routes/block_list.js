const express = require('express');
const router = express.Router();
const { getChapterBlockList } = require('../utils/edx_service');

router.get('/', (req, res, next) => {
  const access_token = req.session.user.access_token;
  const chapter_id = req.query.chapter_id;

  getChapterBlockList(access_token, 'zen', chapter_id)
    .then((blockList) => {
      res.render('block_list', {
        title: '视频列表',
        blockList: blockList
      });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
