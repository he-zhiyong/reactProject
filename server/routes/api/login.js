var express = require('express');
var router = express.Router();
var UserModel = require('../../models/user');

router.post('/', function (req, res, next) {
    var userName = req.body.userName;
    var password = req.body.password;
    UserModel.getUserByName(userName)
        .then(function (user) {
            var result = {
                message:'登录成功！'
            }
            if (!user) {
                result.message = '用户不存在';
            }
            // 检查密码是否匹配
            if (password !== user.password) {
                result.message = '登录失败！密码错误' 
            }
            res.send(result);
        })
        .catch(next);
});

module.exports = router;