const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');// 用户认证模块passport
const app = express();
const port = 3001

app.use(passport.initialize());// 初始化passport模块
app.use(bodyParser.json());// body解析中间件
app.use(express.static(path.join(__dirname, '../dist')));// 设置静态文件目录
routes(app);

app.listen(port, function () {
    console.log(`server listensing on port ${port}`);
});