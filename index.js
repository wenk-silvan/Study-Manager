var path = require('path');
var favicon = require('serve-favicon');
var express = require('express');
var expressVue = require('express-vue');
var mongoose = require('mongoose');
var app = express();
require('./routes')(app);

mongoose.connect('localhost:27017/study-manager');

app.engine('vue', expressVue);
app.set('view engine', 'vue');
app.set('views', path.join(__dirname, '/public/views'));
app.set('vue', {
    componentsDir: path.join(__dirname, '/public/views/components'),
    defaultLayout: 'layout'
});
app.use('/node_modules', express.static(__dirname + '/node_modules/'));
app.use('/public', express.static(__dirname + '/public/'));
app.use(favicon(path.join(__dirname,'public','images','favicon.png')));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE');
    next();
});

app.listen(3000);
console.log('Express server listening on port 3000');
