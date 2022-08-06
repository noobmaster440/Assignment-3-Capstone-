const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const passport = require('passport');  // authentication
const connectEnsureLogin = require('connect-ensure-login');
const session=require('express-session')
const {v4:uuidv4}=require('uuid')
const User = require('./user.js');

app.use(bodyParser.urlencoded({extended:false}))
app.use(session({
    secret:'=fmLV*U@FL`N]]~/zqtFCch.pBTGoU',
    resave:false,
    saveUninitialized:true,
    cookie:{maxAge:60*60*1000}
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/static/index.html')
})

app.get('/login',(req,res)=>{
    res.sendFile(__dirname+'/static/login.html')
})

app.get('/signup',(req,res)=>{
    res.sendFile(__dirname+'/static/signup.html')
})

app.get('/dashboard', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    res.send(`Hello ${req.user.username}. Your session ID is ${req.sessionID} 
     and your session expires in ${req.session.cookie.maxAge} 
     milliseconds.<br><br>
     <a href="/logout">Log Out</a><br><br>
     <a href="/secret">Members Only</a>`);
  });

app.get('/secret', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    res.sendFile(__dirname + '/static/secret-page.html');
});

app.get('/logout', function(req, res) {
    req.logout(()=>{});
    res.redirect('/login');
});

app.post('/login', passport.authenticate('local', { failureRedirect: '/' }),  function(req, res) {
	console.log(req.user)
	res.redirect('/dashboard');
});

app.post('/signup',  function(req, res) {
	console.log(req.body.password)
    User.register({ username: req.body.username, active: false }, req.body.password);
	res.redirect('/login');
});

const port=9000

app.listen(port,()=>{console.log(`app is running on port ${port}`)})