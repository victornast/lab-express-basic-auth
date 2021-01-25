const { Router } = require('express');
const router = Router();

router.get('/', (req, res, next) => {
  let newUser = req.query.new;
  let loggedUser = req.query.enter;
  res.render('index', { newUser, loggedUser });
});

module.exports = router;
