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
    .then(() => {
      res.redirect('/?new=true');
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/login', (req, res, next) => {
  res.render('authentication/login');
});

router.post('/login', (req, res, next) => {
  const data = req.body;
  let user;
  User.findOne({ username: data.username })
    .then((doc) => {
      user = doc;
      if (user) {
        return bcryptjs.compare(data.password, user.password);
      } else {
        throw new Error('Username could not be found.');
      }
    })
    .then((result) => {
      if (result) {
        req.session.userId = user._id;
        res.redirect('/?enter=true');
      } else {
        throw new Error("The password doesn't match.");
      }
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/logout', (req, res, next) => {
  req.session.destroy();
  res.redirect('/?bye=true');
});

module.exports = router;
