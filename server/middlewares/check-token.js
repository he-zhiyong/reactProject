const jwt = require('jsonwebtoken');
const {tokenConfig} = require('../config');
const {secret,option} = tokenConfig.jwt; 

module.exports = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    var result = {
        success: false
    }
    if (token) {
        jwt.verify(token, secret, function (err, decoded) {
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
                var content ={
                    userName:decoded.userName
                };
                var token = jwt.sign(content,secret,option);
                res.header('x-access-token',token);
                req.userInfo = decoded;
                next();
            }
        });
    } else {
        result.message = '没有访问权限！'
        return res.status(403).send(result);
    }
};