var path = require('path');
var subjects = require('../data/subjects.data.js');

module.exports = {
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

