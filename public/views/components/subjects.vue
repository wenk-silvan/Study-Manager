<template>
    <div id="subjects" class="container">
        <div id="modals">
            <div class="modal fade" id="mdRemove" tabindex="-1" role="dialog" aria-labelledby="mdRemoveLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title w-100" id="mdRemoveLabel">Remove Subject?</h4>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button @click="remove(selectedSubject)" type="button" class="btn btn-primary">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="mdAdd" tabindex="-1" role="dialog" aria-labelledby="mdAddLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title w-100" id="mdAddLabel">New Subject</h4>
                        </div>
                        <div class="modal-body">
                            <div class="md-form">
                                <i class="fa fa-pencil-square-o prefix"></i>
                                <input v-model="newSubject.title" type="text" id="form-title" class="form-control">
                                <label for="form-title">The title</label>
                            </div>
                            <div class="md-form">
                                <i class="fa fa-picture-o prefix"></i>
                                <input v-model="newSubject.imageName" type="text" id="form-img" class="form-control">
                                <label for="form-img">Name of the image <small>(e.g. "img.png")</small></label>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button @click="add(newSubject)" type="button" class="btn btn-primary">Save</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="mdAddTask" tabindex="-1" role="dialog" aria-labelledby="mdAddTaskLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title w-100" id="mdAddTaskLabel">New Task for {{ selectedSubject.title }}</h4>
                        </div>
                        <div class="modal-body">
                            <div class="md-form">
                                <i class="fa fa-pencil-square-o prefix"></i>
                                <input v-model="newTask" type="text" id="form-task-name" class="form-control">
                                <label for="form-task-name">Task</label>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button @click="addTask(newTask, selectedSubject)" type="button" class="btn btn-primary">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <h1 class="h1-responsive">Subjects</h1>
        <hr>
        <div class="row">
            <div class="subject col-sm-12 col-md-6 col-xl-4" v-for="subject in subjects">
                <div class="card-wrapper" v-if="!subject.detailedView">
                    <div class="card">
                        <div class="img-fluid" :style="{ backgroundImage: 'url(/public/images/' + subject.imageName + ')' }"></div>
                        <div class="card-block">
                            <h4 class="card-title">{{ subject.title }}</h4>
                            <div class="row">
                                <div class="col-7">
                                    <p class="card-text">{{ getInfoText(subject.tasks) }}</p>
                                </div>
                                <div class="col-5">
                                    <a @click="subject.detailedView = true" class="btn btn-primary btn-open waves-effect waves-light">Open</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-wrapper card-backside" v-else>
                    <div class="card">
                        <div class="card-block">
                            <h4 class="card-title"><strong>{{ subject.title }}</strong></h4>
                            <div class="row btns-action">
                                <a @click="selectedSubject = subject" class="btn btn-warning btn-add-task waves-effect waves-light" data-toggle="modal" data-target="#mdAddTask">Task</a>
                                <a @click="selectedSubject = subject" class="btn btn-danger btn-remove waves-effect waves-light" data-toggle="modal" data-target="#mdRemove">Delete</a>
                                <a @click="subject.detailedView = false" class="btn btn-default btn-close waves-effect waves-light">Close</a>
                            </div>
                            <div class="todo-item" v-for="(task, index) in subject.tasks">
                                <div class="row">
                                    <div class="col-7 ">
                                        <div :class="{ strikethrough: task.done }">{{ task.name }}</div>
                                    </div>
                                    <div class="col-5 btn-status">
                                        <a @click="removeTask(subject, task)" class="btn btn-outline-secondary btn-trash waves-effect waves-light" v-if="task.done"><span class="fa fa-trash-o"></span></a>
                                        <a @click="task.done = false; editTask(subject);" class="btn btn-outline-success btn-done waves-effect waves-light" v-if="task.done"><span class="fa fa-check"></span></a>
                                        <a @click="task.done = true; editTask(subject);" class="btn btn-outline-secondary btn-todo waves-effect waves-light" v-else><span class="fa fa-times"></span></a>
                                    </div>
                                </div>
                                <hr v-if="index !== subject.tasks.length - 1">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button type="button" class="btn btn-outline-success waves-effect btn-add" data-toggle="modal" data-target="#mdAdd">
            <span class="fa fa-plus"></span>
        </button>
    </div>
</template>

<script>
</script>