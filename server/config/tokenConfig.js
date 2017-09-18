const tokenConfig = {
    jwt:{
        secret:'hezhiyong',
        option:{
            expiresIn: 60*60*1// token到期时间设置，单位（秒)
        }
    }
};

module.exports = tokenConfig;