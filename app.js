const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const passport = require('passport');  // authentication
const connectEnsureLogin = require('connect-ensure-login');
const session=require('express-session')
const {v4:uuidv4}=require('uuid')
const User = require('./models/user.js');
var properties = require('./config/property');
var db = require('./config/database');
var postRoutes = require('./routes/posts');
var indexRoutes=require('./routes/index')
var log = require('morgan')('dev');
var router=express.Router();
// var flash = require('flash');
// var flash = require('flash-express')
var methodOverride = require("method-override");
var flash = require('connect-flash');

const port=9000

db();
app.set('view engine', 'ejs'); 
app.use(log)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(methodOverride("_method"));
app.use(flash());

app.use(session({
    secret:'=fmLV*U@FL`N]]~/zqtFCch.pBTGoU',
    resave:false,
    saveUninitialized:true,
    cookie:{maxAge:60*60*1000}
}))

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");
    next();
 });

app.use(passport.initialize());
app.use(passport.session());


passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
  });

app.use("/",indexRoutes)
app.use("/posts",postRoutes)

app.listen(properties.PORT, (req, res) => {
    console.log(`Server is running on ${properties.PORT} port.`);
})