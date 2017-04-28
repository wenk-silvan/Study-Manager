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

var subjects = require('./public/data/data.js');
var pageTitle = 'Study Manager';
var subjectMixin = {
    data(){
        return {
            selectedSubject: {},
            newTask: "",
            subjects: subjects.data.subjects,
            newSubject : {
                title: '',
                imageName: ''
            }
        }
    },
    methods: {
        remove: function(subject) {
            if(subject != undefined) this.subjects.splice(this.subjects.indexOf(subject), 1);
            $(function () {
                $('#mdRemove').modal('toggle');
            });
        },
        add: function(subject) {
            console.log(this.subjects)
            let title = subject.title;
            if(title === "") title = "Example";
            let image = subject.imageName;
            if(image === "") image = "default.png";

            if(subject !== undefined) this.subjects.push({
                title: title,
                tasks: [
                    { name: 'Example', done: true },
                ],
                imageName: image,
                detailedView: false
            });

            this.newSubject = { title: "", imageName: "" };

            $(function () {
                $('#mdAdd').modal('toggle');
            });
        },
        getInfoText: function(tasks) {
            if(tasks === undefined) return "No tasks saved";
            let count = 0;
            for(let i = 0; i < tasks.length; i++) {
                if(!tasks[i].done) count++;
            }
            if(count == 0) return "Nothing to do here!";
            if(count == 1) return "One unfinished task!";
            return count.toString() + " unfinished tasks!";
        },
        addTask: function(task, subject) {
            let name = task;
            if(name === "") name = "Example task";
            this.subjects[this.subjects.indexOf(subject)].tasks.push({
                name: name,
                done: false
            });
            this.newTask = "";

            $(function () {
                $('#mdAddTask').modal('toggle');
            });
        },
        removeTask: function(subject, task) {
            if(subject !== undefined && task !== undefined) {
                let subjectIndex = this.subjects.indexOf(subject);
                let taskIndex = this.subjects[subjectIndex].tasks.indexOf(task);

                this.subjects[subjectIndex].tasks.splice(taskIndex, 1);
            }
        }
    }
};

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
            mixins: [subjectMixin]
        }
    };
    res.render('index', scope);
});

app.get('/test', function(req, res){
   res.send('Test')
});

app.listen(3000);
console.log('Express server listening on port 3000');
