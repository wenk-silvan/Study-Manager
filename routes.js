var path = require('path');
var Subjects = require('./models/subject.model');

module.exports = function(app) {
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
                        { style: '/public/styles/subjects.css' }
                    ],
                    structuredData: {}
                },
                components: ['smheader', 'smfooter', 'subjects'],
                mixins: mixins
            }
        };
        res.render('index', scope);
    });

    app.get('/subjects', function(req, res) {
        Subjects.find(function(err, subjects) {
            if(err) {
                return res.status(500).json({
                    message: 'Error while fetching subjects: ' + err.message
                });
            }
            res.status(200).json({
                data: subjects,
                message: 'Got subjects successfully'
            });
        });
    });
};