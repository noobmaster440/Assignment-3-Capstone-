var Posts = require('./posts.dao');

exports.createPost = function (req, res, next) {
    var post = {
        title: req.body.title,
        body: req.body.body
    };

    Posts.create(post, function(err, post) {
        if(err) {
            console.log(`caught an error which is ${err}`)
            res.json({
                error : err,
            })
        }
        res.json({
            message : "Post created successfully !!!"+post
        })
    })
}

exports.getPost = function(req, res, next) {
    Posts.get({}, function(err, posts) {
        if(err) {
            console.log("get posts function got trigerred")

            res.json({
                error: err
            })
        }
        console.log(` all good, post found ${post} `)

        res.json({
            posts: posts
        })
    })
}

exports.getPost = function(req, res, next) {
    Posts.get({title: req.params.title}, function(err, post) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            post: post
        })
    })
}

exports.updatePost = function(req, res, next) {
    var post = {
        title: req.body.title,
        body: req.body.body
    }
    Posts.updateOne({_id: req.params.id}, post, function(err, post) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Post updated successfully"
        })
    })
}

exports.removePost = function(req, res, next) {
    Posts.delete({_id: req.params.id}, function(err, post) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "Post deleted successfully"
        })
    })
}