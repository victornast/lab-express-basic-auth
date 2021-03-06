const { Router } = require('express');
const router = Router();

router.get('/', (req, res, next) => {
  let newUser = req.query.new;
  let loggedUser = req.query.enter;
  let loggedOut = req.query.bye;
  res.render('index', { newUser, loggedUser, loggedOut });
});

module.exports = router;
