var path = require('path');
var Subject = require('./models/subject.model');

module.exports = function(app) {
    var pageTitle = 'Study Manager';

    app.get('/', function(req, res){
        var mixins = [
            require(path.join(__dirname, '/mixins/subjects.mixins.js'))
        ];
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
                        { style: '/public/styles/shared.css' },
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

    app.get('/api/subjects', function(req, res) {
        Subject.find(function(err, subjects) {
            if(err) {
                return res.status(500).json({
                    message: 'Error while fetching subjects: ' + err.message
                });
            }
            console.log("Successfully got subjects from database");
            res.status(200).json({
                data: subjects,
                message: 'Got subjects successfully'
            });
        });
    });

    app.post('/api/subjects', function(req, res) {
        var subject = new Subject({
            title: req.body.title,
            tasks: req.body.tasks,
            imageName: req.body.imageName,
            detailedView: req.body.detailedView
        });

        subject.save(function(err, result) {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Error while adding subject, server error: ' + err.errors
                });
            }
            console.log("Added subject successfully to database.");
            res.status(200).json({
                data: result._id,
                message: 'Added subject successfully.'
            });
        });
    });

    app.delete('/api/subjects/:id', function(req, res) {
        var id = req.params.id;
        Subject.remove({_id: id}, function(err) {
            if(err) {
                return res.status(500).json({
                    message: 'Error while deleting subject: ' + err
                });
            }
            console.log("Deleted subject successfully from database.");
            res.status(200).json({
                message: 'Deleted subject successfully'
            });
        });
    });

    app.put('/api/subjects/tasks/:id', function(req, res) {
        Subject.update({_id: req.params.id}, {
            tasks: req.body.tasks
        },
        function(err, raw) {
            if(err) {
                console.log("Error while updating tasks of subject: " + req.params.id);
                return res.status(500).json({
                    message: 'Error while deleting subject: ' + err
                });
            }
            console.log("Successfully updated tasks of subject: " + req.params.id);
            res.status(200).json({
                message: 'Updated subject successfully',
                raw: raw
            });
        });
    });
};