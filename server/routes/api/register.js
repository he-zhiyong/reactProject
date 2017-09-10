var express = require('express');
var router = express.Router();
var UserModel = require('../../models/user');

router.post('/', function (req, res, next) {
    var userName = req.body.userName;
    var password = req.body.password;
    // 待写入数据库的用户信息
    var user = {
        userName: userName,
        password: password
    };
    // 用户信息写入数据库
    UserModel.create(user)
        .then(function () {
            var result = {}
            result.message = '用户注册成功！';
            res.send(result);
        })
        .catch(next);
});


module.exports = router;