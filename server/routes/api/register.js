const express = require('express');
const router = express.Router();
const UserModel = require('../../mongo/models/user');

router.post('/', function (req, res, next) {
    var user = {
        userName: req.body.userName,
        password: req.body.password
    };
    var result = {
        success:false
    }
    // 用户信息写入数据库
    UserModel.create(user,(err) =>{
        if(err&&err.code === 11000){
            result.success = false;
            result.message = '用户已存在!';
        }else{
            result.success = true;
            result.message = '注册成功!';
        }
        res.send(result);
    })
});

module.exports = router;