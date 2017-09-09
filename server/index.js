var express = require('express');
var app = express();

var userRouter = require('./routes/users');

//app.use('/', indexRouter);
app.use('/', userRouter);

app.listen(3001);