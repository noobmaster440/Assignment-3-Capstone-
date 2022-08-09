var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var postSchema = new Schema({
    title :{
        type: String,
        unique : false,
        required : true
    },
    body : {
        type: String,
        unique : false,
        required : true
    },
}, {
    timestamps: true
});

module.exports = postSchema;