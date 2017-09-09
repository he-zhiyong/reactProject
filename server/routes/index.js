var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.send('hello, express');
});
router.get('/user', function(req, res) {
  res.send('he');
});

module.exports = router;