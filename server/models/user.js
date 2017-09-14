const User = require("../schemas/user"); 

const UserModel = {
    // 注册一个用户
    create: (user,callBack) => {
        var newUser = new User(user);
        newUser.save((err) => {
            callBack(err);
        });
    },
    // 通过用户名获取用户信息
    getUserByName:(userName,callBack) => {
        var findUserName = {
            userName:userName
        } 
        User.findOne(findUserName, (err, res) => {
            callBack(err, res);
        })
    },
    // 修改更新用户信息
    updateUser:(user) => {
        var updateByUserName = {
            userName:user.userName
        },
        updateUserData = user;
        User.update(updateByUserName, updateUserData,(err, res) =>{
            if (err) {
                console.log("Error:" + err);
            }
            else {
                console.log(res);
            }
        })
    },
    //注销删除用户信息
    removeUser:(user) => {
        var removeByUserName = {
            userName:user.userName
        };
        User.remove(removeByUserName, (err, res) =>{
            if (err) {
                console.log("Error:" + err);
            }
            else {
                console.log(res)
            }
        })
    }
};
module.exports = UserModel;
