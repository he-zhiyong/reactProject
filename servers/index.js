var express = require('express');
var app = express();
const port = 3001

app.get('/', function(req, res) {
    res.send('hello, express');
});

app.get('/users/:name', function(req, res) {
    res.send('hello, ' + req.params.name);
});
app.get('/name', function(req, res) {
    var result = {
        success:true,
        data:{
            name:"Hezhiyong",
            age:24
        }
    }
    res.send(result);
});

app.get('/?name=', function(req, res) {
    res.send('hello, ' + req.query.name);
});

app.listen(port);
console.log('Server running at http://localhost:'+port);