const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const UserModel = require('../../mongo/models/user');

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
                var content ={
                    userName:userName
                };
                var secretOrPrivateKey="tokenKey" // 加密的key（密钥）
                var option = {
                    expiresIn: 60*60*1// token到期时间设置
                }
                var token = jwt.sign(content,secretOrPrivateKey,option);
                result.success = true;
                result.message = '登录成功!'; 
                res.header('x-access-token',token);
                res.send(result);
            }
        } else {
            result.message = "用户不存在！";
            res.send(result);
        }
    })
});

module.exports = router;