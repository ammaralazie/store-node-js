const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../model/User");
const passport = require("passport");
const { NotExtended } = require("http-errors");
const isAuthenticated=require('../middlware/AuthMiddlware')
const csrf=require('csurf')
router.use(csrf())

//signup get
router.get("/signup", (req, res) => {
    /* if(req.flash("errorUserFind")){
        req.flash('errorsSignup').push( req.flash("errorUserFind"))
    } */
  context = {
    errorsSignup:req.flash('errorsSignup'),
    _token:req.csrfToken()
  };
  res.render("registration/signup", context);
});

//signup post
router.post(
  "/signup",
  [
    check("username", "the username must be string").notEmpty().isString(),
    check("email", "the email felid must be email").notEmpty().isEmail(),
    check("password", "plase enter the password")
      .notEmpty()
      .isString()
      .isLength({ min: 5 }),
    //the value in custom is value for confirm_password and must req be object
    check("confirm_password")
      .notEmpty()
      .custom((value, { req }) => {
        if (value != req.body.password) {
          throw new Error("the password do not mach");
        } //end of if
        else {
          return true;
        } //end fo else
      }),
  ],
  (req, res, next) => {
    var error = validationResult(req);
    if (!error.isEmpty()) {
      req.flash("errorsSignup", error.array());
      res.redirect("/users/signup");
    }
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) {
        console.log(err);
      } else if (user) {
        req.flash("errorUserFind", "this email is exists");
        res.redirect("/users/signup");
      } else {
        next()
      }
    }); //end of findOne for email
  }//end of function 
  ,passport.authenticate("local.signup", {
    successRedirect: "/",
    failureRedirect: "/users/signup",
    failureFlash: true,
  })//end of passport
)//end of signup get
  

//login get
router.get("/login", (req, res) => {
  context = {
    errors: req.flash("error"),
    _token:req.csrfToken()
  };
  res.render("registration/login.ejs", context);
});

//post login page
router.post(
  "/login",
  passport.authenticate("local.login", {
    successRedirect: "/",
    failureRedirect: "/users/login",
    failureFlash: true,
  })
);

//get logout page
router.get("/logout",isAuthenticated,(req, res) => {
    req.logout()
    res.redirect('/users/login')
  });

module.exports = router;
