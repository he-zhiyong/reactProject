const express = require('express');
const router = express.Router();
const checkToken = require('../../middlewares/check-token');
const UserModel = require('../../models/user');

router.get('/', checkToken, function (req, res) {
    var userName = req.userInfo.userName;
    var result = {
        success: false
    }
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
})

module.exports = router;