var mongoose = require('mongoose');
var postSchema = require('./posts.model');

postSchema.statics = {
    create : function(data, cb) {
        var post = new this(data);
        post.save(cb);
    },

    get: function(query, cb) {
        this.find(query, cb);
    },

    getByName: function(query, cb) {
        this.find(query, cb);
    },

    update: function(query, updateData, cb) {
        this.findOneAndUpdate(query, {$set: updateData},{new: true}, cb);
    },

    delete: function(query, cb) {
        this.findOneAndDelete(query,cb);
    }
}

var postsModel = mongoose.model('Posts', postSchema);
module.exports = postsModel;