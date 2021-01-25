const { Router } = require('express');
const router = Router();

router.get('/', (req, res, next) => {
  let newUser = req.query.new;
  res.render('index', { newUser });
});

module.exports = router;
