var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();

//import express session and flash
const session = require('express-session')
const flash = require('connect-flash');

//import for passport and passport-setup model
const passport = require("passport");
const passportSetup = require("./database/passport-setup");

app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAag: 60000 * 60 },
  })
);
app.use(flash());

//section initializationn and session for passport
app.use(passport.initialize());
app.use(passport.session());

//import body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//import database
const db=require('./database/db')

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const user_router=require('./routes/user-router')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

app.use('/', indexRouter);
app.use('/users',user_router)
//import router for user-router



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//this function to check every requset is auth or no
app.get('*',(req,res,next)=>{
  res.locals.user=req.user || null
  next()
})

module.exports = app;
