const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    var result = {
        success: false
    }
    if (token) {
        var secretOrPrivateKey = "tokenKey"
        jwt.verify(token, secretOrPrivateKey, function (err, decoded) {
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
                req.userInfo = decoded;
                next();
            }
        });
    } else {
        result.message = '没有访问权限！'
        return res.status(403).send(result);
    }
};