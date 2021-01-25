const express = require('express');
const router = new express.Router();
const User = require('./../models/user');

router.get('/', (req, res, next) => {
  if (req.user) {
    User.findById(req.user._id)
      .then((user) => {
        res.render('profile/profile', { user });
      })
      .catch((error) => next(error));
  } else {
    next(new Error('Page is unavailable without an accout.'));
  }
});

router.get('/main', (req, res, next) => {
  if (req.user) {
    res.render('profile/main');
  } else {
    next(new Error('Page is unavailable without an accout.'));
  }
});

router.get('/private', (req, res, next) => {
  if (req.user) {
    User.find;
    res.render('profile/private');
  } else {
    next(new Error('Page is unavailable without an accout.'));
  }
});

module.exports = router;
