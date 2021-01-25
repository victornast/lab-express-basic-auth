const express = require('express');
const router = new express.Router();
const User = require('./../models/user');
const bcryptjs = require('bcryptjs');

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

router.get('/edit', (req, res, next) => {
  if (req.user) {
    User.findById(req.user._id)
      .then((user) => {
        res.render('profile/edit', { user });
      })
      .catch((error) => next(error));
  } else {
    next(new Error('Page is unavailable without an accout.'));
  }
});

router.post('/edit', (req, res, next) => {
  const data = req.body;
  if (req.user) {
    if (data.password) {
      bcryptjs.hash(data.password, 10).then((password) =>
        User.findByIdAndUpdate(
          req.user._id,
          {
            username: data.username,
            name: data.name,
            password: password
          },
          { new: true, useFindAndModify: false }
        )
          .then(() => {
            res.redirect('/profile');
          })
          .catch((error) => next(error))
      );
    } else {
      User.findByIdAndUpdate(
        req.user._id,
        {
          username: data.username,
          name: data.name
        },
        { new: true, useFindAndModify: false }
      )
        .then(() => {
          res.redirect('/profile');
        })
        .catch((error) => next(error));
    }
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
