//var express = require('express');
//var router = express.Router();
var request = require('request');

var options = {
    headers: {
        "content-type": "application/json",
    },
    url: 'http://192.168.1.115/libinterview',
    method: 'post',
    gzip:true,
    json: true,
    body:{"SERVICE_ID":[0,5,50],"function":"system","classify":"library","input":"","offset":0,"rows":20,"page":1,"pageSize":20}
};
request(options, (error, response, result) => {
    if (!error && response.statusCode === 200) {
        console.log('------接口数据------');
        if(result.success){
            console.log(result.data.list)
        }
    }else{
        console.log(error)
    }
});


/* var options = {
    headers: {
        "content-type": "application/json",
        "Cookie": "session_id=dc9bf3ee7bf6e444a5a29426afc14105;"
    },
    url: 'http://192.168.1.115/libinterview',
    method: 'post',
    gzip:true,
    json: true,
    body:{"SERVICE_ID":[0,5,50],"function":"system","classify":"library","input":"","offset":0,"rows":20,"page":1,"pageSize":20}
};
request(options, (error, response, result) => {
    if (!error && response.statusCode === 200) {
        console.log('------接口数据------');
        if(result.success){
            console.log(result.data.list)
        }
    }else{
        console.log(error)
    }
}); */

/* router.all('/*', function (req, res) {
    var method = req.method.toUpperCase();
    var proxy_url = 'http://192.168.1.115';
    var options = {
        headers: {
            "Connection": "close"
        },
        url: proxy_url,
        method: method,
        json: true,
        body: req.body
    };

    function callback(error, response, data) {
        if (!error && response.statusCode == 200) {
            console.log('------接口数据------', data);

            res.json(data)
        }
    }
    request(options, callback);
})

module.exports = router; */