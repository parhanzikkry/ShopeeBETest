var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('histories');
});

router.get('/tracks', (req, res, next) => {
  res.render('tracks');
});

module.exports = router;
