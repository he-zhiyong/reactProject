const request = require('request');

var options = {
    gzip:true,
    json:true,
    url: 'http://192.168.1.115/libinterview',
    method: 'post',
    headers: {
        "content-type": "application/json",
        "Cookie": "session_id=d04cb561de06f84a2e8ff2ad4fa3f3c1;"
    },
    body:{"SERVICE_ID":[0,5,50],"function":"system","classify":"library","input":"","offset":0,"rows":20,"page":1,"pageSize":20}
}
var options1 = {
    gzip:true,
    json:true,
    url: 'http://192.168.1.115/libinterview',
    method: 'post',
    headers: {
        "content-type": "application/json",
        "Cookie": "session_id=d04cb561de06f84a2e8ff2ad4fa3f3c1; loginName=qzma",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36",
        "Origin":"http://dev.stu.flyread.local"

    },
    body:{"SERVICE_ID":[1,1,1],"loginTypes":["login_name","bk_lib"],"encType":"rsa","input":"qzma","password":"LJWtKS7/H2WraI6SP/Y4BXoaILexcbAX71IR4P0q4jOHgGaPKD6wXC1yrfkTUdzkZAFOkPs8rDsgOTqVY4okO+aFPW6Gin9rLpqSSGFCDrnkiyiWBdD9WIrXRAu72W9hWAlxL6TPOzEjCuJEVIExdsQpsZUDnATKtcQ44UlAzNI=","tid":"201710111601325548505707"}
}
var options2 = {
    gzip:true,
    url: 'http://192.168.1.115/library.php',
    method: 'get',
}

request(options2, (error, res, proxyResult) => {
    if (!error && res.statusCode === 200) {
        console.log(res.getHeader('content-type'))
    }
});