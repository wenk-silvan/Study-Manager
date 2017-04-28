var path = require('path');
var favicon = require('serve-favicon');
var express = require('express');
var expressVue = require('express-vue');
var app = express();


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

var pageTitle = 'Study Manager';
var mixins = [
    require(path.join(__dirname, '/mixins/subjects.mixins.js'))
];

app.get('/', function(req, res){
    var scope = {
        data: {
            title: pageTitle
        },
        vue: {
            head: {
                title: pageTitle,
                meta: [
                    //Styles
                    { style: '/node_modules/mdbootstrap/css/bootstrap.min.css' },
                    { style: '/node_modules/mdbootstrap/css/mdb.min.css' },
                    { style: '/node_modules/font-awesome/css/font-awesome.min.css' },
                    { style: '/public/styles/smheader.css' },
                    { style: '/public/styles/smfooter.css' },
                    { style: '/public/styles/subjects.css' },
                    //Scripts
                ],
                structuredData: {}
            },
            components: ['smheader', 'smfooter', 'subjects'],
            mixins: mixins
        }
    };
    res.render('index', scope);
});

app.listen(3000);
console.log('Express server listening on port 3000');
