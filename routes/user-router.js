const express=require('express')
const router=express.Router()
const { check, validationResult } = require('express-validator')
const User=require('../model/User')
const passport=require('passport')


//signup get
router.get('/signup',(req,res)=>{
    context={
        errors:req.flash('errors'),
        errorss:req.flash('errorss')
    }
    res.render('registration/signup',context)
})

//signup post
router.post('/signup',
[
    check('username','the username must be string').notEmpty().isString(),
    check('email','the email felid must be email').notEmpty().isEmail(),
    check('password','plase enter the password').notEmpty().isString().isLength({ min: 5 }),
    //the value in custom is value for confirm_password and must req be object
    check('confirm_password').notEmpty().custom((value,{req})=>{
        if(value != req.body.password){
            throw new Error('the password do not mach')
        }//end of if
        else{
            return true
        }//end fo else
    })
],
(req,res)=>{
    var error=validationResult(req)
    if(!error.isEmpty()){
        req.flash('errors',error.array())
        res.redirect('/users/signup')
    }
    console.log(req.body)
    User.findOne({email:req.body.email},(err,user)=>{
        if(err){
            console.log(err)
        }else if(user){
            req.flash('errorss','this email is exists')
            res.redirect('/users/signup')
        }else{
            User.findOne({username:req.body.username},(err,user)=>{
                if(err){
                    console.log(err)
                }else if(user){
                    req.flash('errorss','this username is exists')
                    res.redirect('/users/signup')
                }else{
                    user=new User({
                        username:req.body.username,
                        email:req.body.email,
                        password:new User().hashPassword(req.body.password)
                    })//end of user obj
                    user.save((err,user)=>{
                        if(err){
                            console.log(err)
                        }else{
                            req.flash('success','welcome Mr '+user.username+' in your profile')
                            res.redirect('/')
                        }
                    })//end of save user
                }
            })//end of find one for username
        }
       })//end of findOne for email
})


//login get
router.get('/login',(req,res)=>{
    context={
        errors:req.flash('error')
    }
    res.render('registration/login.ejs',context)
})

//post login page
router.post(
    "/login",
    passport.authenticate("local.login", {
      successRedirect: "/",
      failureRedirect: "/users/login",
      failureFlash: true,
    })
  );

module.exports=router