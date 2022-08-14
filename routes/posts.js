const express = require("express");
const router = express.Router();
const Post = require('../models/post');
const connectEnsureLogin = require('connect-ensure-login');

// router.post('/create', Posts.createPost);
// // router.get('/get', Posts.getPost);
// // router.get('/get/:name', Posts.getPost);
// router.put('/update/:id', Posts.updatePost);
// router.delete('/remove/:id', Posts.removePost);

//getting all the posts
router.get("/",(req,res)=>{
    Post.find({},(err,allPosts)=>{
        if(err){
            console.log(err)
        }else{
            res.render("posts/index.ejs",{
                posts:allPosts
            })
        }
    })
})

//display form to make a new post
router.get("/new",connectEnsureLogin.ensureLoggedIn(),(req,res)=>{
    res.render("posts/new.ejs")
})

//create a new post
router.post("/",connectEnsureLogin.ensureLoggedIn(),(req,res)=>{
    var title=req.body.title
    var body=req.body.body

    var newPost={
        title:title,
        body:body
    }
    Post.create(newPost,(err,newlyCreated)=>{
        if(err){
            console.log(err)
        }else{
            console.log(newlyCreated)
            req.flash("success","Successfully Updated !!!")
            res.redirect("/posts")
        }
    })
})

//editing
router.get('/:id/edit',connectEnsureLogin.ensureLoggedIn(),(req, res) => {
    Post.findById(req.params.id,(err,foundPost)=>{
        res.render("posts/edit",{post:foundPost})
    })
});


























module.exports = router;