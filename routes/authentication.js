const express = require('express');
const bcryptjs = require('bcryptjs');

const User = require('./../models/user');

const router = new express.Router();

router.get('/signup', (req, res, next) => {
  res.render('authentication/signup');
});

router.post('/signup', (req, res, next) => {
  const data = req.body;
  // Check for the same username
  User.findOne({
    username: data.username
  })
    .then((user) => {
      if (user) {
        throw new Error('Username is already in use.');
      } else {
        return bcryptjs.hash(data.password, 10);
      }
    })
    .then((password) => {
      return User.create({
        username: data.username,
        password: password
      });
    })
    .then((user) => {
      req.session.userId = user._id;
      res.redirect('/?new=true');
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
