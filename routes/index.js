const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const connectEnsureLogin = require('connect-ensure-login');
const Post = require('../models/post');

// var flash = require('flash-express')


router.get('/',(req,res)=>{
    Post.find({},(err,allPosts)=>{
        if(err){
            console.log(err)
        }else{
            res.render("index.ejs",{
                posts:allPosts
            })
        }
    })
})

router.get('/login',(req,res)=>{
    res.render("login.ejs")
    
})

router.get('/register',(req,res)=>{
    res.render("register.ejs")
})

router.get('/dashboard', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    res.send(`Hello ${req.user.username}. Your session ID is ${req.sessionID} 
     and your session expires in ${req.session.cookie.maxAge} 
     milliseconds.<br><br>
     <a href="/logout">Log Out</a><br><br>
     <a href="/posts/">Members Only</a>`);
  });

router.get('/secret', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    res.render("secret-page.ejs")

});

router.get("/logout", (req, res, next) => {
    req.logout(err=>{
        if(err){return next(err);}
        res.redirect("/login");
    });
    // req.flash("success", "Logged you out");

  });

router.post('/login', passport.authenticate('local', { failureRedirect: '/' }),  function(req, res) {
	console.log(req.user)
	res.redirect('/dashboard');
});

router.post('/signup',  function(req, res) {
	console.log(req.body.password)
    User.register({ username: req.body.username, active: false }, req.body.password);
	res.redirect('/login');
});

module.exports = router;
