var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.send('登录成功！');
});
router.post('/', function(req, res, next) {
    var userName = req.body.userName;
    var password = req.body.password;
    var result = {
        success:true,
        userName:userName,
        password:password
    }
    res.send(result);
    
});

module.exports = router;