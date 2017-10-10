const express = require('express');
const router = express.Router();
const request = require('request');

router.post('/', function (req, res) {
    var result = {
        success: false
    }
    var defaultOptions = {
        gzip:true,
        json:true
    };
    var options = Object.assign(defaultOptions,req.body.options||{});
    request(options, (error, response, proxyResult) => {
        if (!error && response.statusCode === 200) {
            result.success = true;
            result.message = "请求成功！";
            result.proxyResult = proxyResult;
            res.send(result);
        }else{
            result.message = "请求错误！";
            result.error = error;
            res.send(result);
        }
    });
})

module.exports = router;