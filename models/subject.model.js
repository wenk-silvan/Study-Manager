var mongoose = require('mongoose');
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

var schema_subject = new Schema({
    title: {type: String, required: true},
    tasks: [{
        name: String,
        done: Boolean
    }],
    imageName: {type: String, required: true},
    detailedView: {type: Boolean, required: true}
});

module.exports = mongoose.model('Subject', schema_subject);