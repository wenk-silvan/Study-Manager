var path = require('path');
var axios = require('axios');

module.exports = {
    data(){
        return {
            selectedSubject: {},
            newTask: "",
            subjects: [],
            newSubject : {
                title: '',
                imageName: ''
            }
        }
    },
    methods: {
        remove: function(subject) {
            var scope = this;
            axios.delete('/api/subjects/' + subject._id)
                .then(function() {
                    if(subject != undefined) {
                        scope.subjects.splice(scope.subjects.indexOf(subject), 1);
                        console.log("Removed subject successfully.");
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });

            $(function () {
                $('#mdRemove').modal('toggle');
            });
        },
        add: function(subject) {
            var scope = this;
            if(subject.title == "") subject.title = "Example";
            if(subject.imageName == "") subject.imageName = "default.png";
            let newSubject = {
                id: 0,
                title: subject.title,
                tasks: [
                    { name: 'Task', done: true }
                ],
                imageName: subject.imageName,
                detailedView: false
            };

            let body = JSON.stringify(newSubject);
            axios.post('/api/subjects', body, {headers: {'Content-Type': 'application/json'}})
                .then(function(response) {
                    if(subject !== undefined) {
                        console.log(response.data.message);
                        newSubject._id = response.data.data;
                        scope.subjects.push(newSubject);
                    }
                })
                .catch(function(error) {
                    console.log(error);
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
        getSubjects: function() {
            axios.get('/api/subjects').then(response => {
                this.subjects = response.data.data;
                console.log(response.data.message);
            }, response => {
                return "Server error: " + response;
            });
        },
        addTask: function(task, subject) {
            var scope = this;
            let name = task;
            if(name === "") name = "Example task";
            var tasks = this.subjects[this.subjects.indexOf(subject)].tasks;
            tasks.push({
                name: name,
                done: false
            });
            this.editTask(subject);
            this.newTask = "";
            $(function () {
                $('#mdAddTask').modal('toggle');
            });
        },
        removeTask: function(subject, task) {
            if(subject !== undefined && task !== undefined) {
                let subjectIndex = this.subjects.indexOf(subject);
                let taskIndex = this.subjects[subjectIndex].tasks.indexOf(task);
                var tasks = this.subjects[subjectIndex].tasks;
                tasks.splice(taskIndex, 1);
                this.editTask(subject);
            }
        },
        editTask: function(subject) {
            var body  = JSON.stringify({tasks: subject.tasks});
            axios.put('/api/subjects/tasks/' + subject._id, body, {headers: {'Content-Type': 'application/json'}})
                .then(function(response) {
                    console.log(response.data.message);
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    },
    mounted: function(){
        this.getSubjects();
    }
};

