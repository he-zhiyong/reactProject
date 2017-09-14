const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const UserModel = require('../../models/user');

router.post('/', function (req, res, next) {
    var token = req.header('Authorization')
    var secretOrPrivateKey = "tokenKey"
    var result = {
        success: false
    }
    jwt.verify(token, secretOrPrivateKey, (err, decode) => {
        if (err) {
            switch (err.name) {
                case "TokenExpiredError":
                    result.message = '登录已失效，请重新登录！'
                    break;
                case "JsonWebTokenError":
                    result.message = '身份验证错误！'
                    break;
                default:
                    result.message = '未知错误！'
                    break;
            }
            res.send(result)
        } else {
            var userName = req.body.userName;
            UserModel.getUserByName(userName, (err, user) => {
                if (err) {
                    result.message = "数据库查询错误";
                    throw err;
                }
                if (user) {
                    result.success = true;
                    result.message = "用户信息获取成功！";
                    result.user = user;
                } else {
                    result.message = "用户不存在！";
                }
                res.send(result);
            })
        }
    })
});

module.exports = router;