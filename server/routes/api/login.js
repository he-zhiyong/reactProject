var express = require('express');
var router = express.Router();
var UserModel = require('../../models/user');

router.post('/', function (req, res, next) {
    var userName = req.body.userName;
    var password = req.body.password;
    UserModel.getUserByName(userName,(err,users) =>{
        var result = {
            success:false
        }
        if(err){
            result.message = "数据库查询错误"
        }else{
            var user = users[0]
            if(user){
                // 检查密码是否匹配
                if (password !== user.password){
                    result.message = '登录失败！密码错误' 
                }else{
                    result.success = true;
                    result.message = '登录成功！' 
                }
            }else{
                result.message = "用户不存在！"
            }  
        }
        res.send(result); 
    })
});

module.exports = router;