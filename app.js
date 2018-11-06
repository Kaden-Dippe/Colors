var express = require('express');
var request = require('request');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static(__dirname + '/public')).use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/action', function(req, res) {
    console.log('User input: ', req.body.name);
    res.send(req.body.name);
});

app.listen(8888, () => console.log('Server initialized!'));
