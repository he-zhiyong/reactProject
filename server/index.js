var express = require('express');
var routes = require('./routes');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
const port = 3001

// body解析中间件
app.use(bodyParser.json());
// 设置静态文件目录
app.use(express.static(path.join(__dirname, '../dist')));
routes(app);

app.listen(port, function () {
    console.log(`server listening on port ${port}`);
});