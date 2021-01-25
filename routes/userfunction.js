const express = require('express');
const router = new express.Router();

router.get('/main', (req, res, next) => {
  if (req.user) {
    res.render('profile/main');
  } else {
    next(new Error('Page is unavailable without an accout.'));
  }
});

router.get('/private', (req, res, next) => {
  if (req.user) {
    res.render('profile/private');
  } else {
    next(new Error('Page is unavailable without an accout.'));
  }
});

module.exports = router;
