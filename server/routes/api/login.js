var express = require('express');
//const jwt = require('jsonwebtoken');
var router = express.Router();
var UserModel = require('../../models/user');

router.post('/', function (req, res, next) {
    var userName = req.body.userName;
    var password = req.body.password;
    UserModel.getUserByName(userName, (err, user) => {
        var result = {
            success: false
        }
        if (err) {
            result.message = "数据库查询错误";
            throw err;
        }
        if (user) {
            // 检查密码是否匹配
            if (password !== user.password) {
                result.message = '登录失败，密码错误！';
            } else {
               /*  var token = jwt.sign({
                    userName: userName
                }, 'test', {
                    expiresIn: 10080 // token到期时间设置
                });
                user.token = token;
                user.save(function (err) {
                    if (err) {
                        res.send(err);
                    }
                }); 
                res.json({
                    success: true,
                    message: '验证成功!',
                    token: 'Bearer ' + token,
                    userName: userName
                });*/
                result.success = true;
                result.message = '登录成功！';
            }
        } else {
            result.message = "用户不存在！";
        }
        res.send(result);
    })
});

module.exports = router;