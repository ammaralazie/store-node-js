const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../model/User");

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });


passport.use(
  "local.signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      if (req.body.password != req.body.confirm_password) {
        return done(null, false, req.flash("error", "password do not match"));
      } //end of if
      else {
        User.findOne({ email: username }, (err, user) => {
          if (err) {
            console.log(err)
          } else if (user) {
            return done(null, false, req.flash("errorUserFind", "email is exists"))
          } else if (!user) {
            User.findOne({ username: req.body.username }, (err, user) => {
              if (err) {
                console.log(err)
              } else if (user) {
                return done(
                  null,
                  false,
                  req.flash("errorUserFind", "username is exists")
                )
              }
              if (!user) {
                const newUser = new User()
                newUser.username = req.body.username
                newUser.email = username
                newUser.password = newUser.hashPassword(password)
                // newUser.avater='profile.png'
                // newUser.created_at=new Date()
                newUser.save((err, user) => {
                  if (!err) {
                    return done(
                      null,
                      user,
                      req.flash("userSuccess", "welocome mr"+user.username+"in your website")
                    )
                  } else {
                    console.log(err)
                  }
                })
              }
            })
          }
        })
      }
    }
  )
)
//end  of local.signup

passport.use(
    "local.login",
    new localStrategy(
      {
        usernameField:'email',
        passwordField: "password",
        passReqToCallback: true,
      },
      (req, username, password, done) => {
        //login by username or eamil
          var typee=(req.body.email.indexOf('@') === -1) ? 'username' :'email'
              if(typee=='username'){
                User.findOne({username:username}, function(err,user){
                  if(err){
                      return done(null,false,req.flash('error','something is happend plase try agin'))
                  }else if(!user){
                      return done(null,false,req.flash('error','this username is not registered'))
                  }else if(user){
                    if( user.comparePassword(password,user.password)){
                      return done(null,user,req.flash('success','user is authenticated'))
                    }else{
                      return done(null,false,req.flash('error','this password is incorrect'))
                    }
                  }//end of elseif user
              });//end of quary
              }//end if of  typee
              else{
                User.findOne({email:username}, function(err,user){
                  if(err){
                      return done(null,false,req.flash('error','something is happend plase try agin'))
                  }else if(!user){
                      return done(null,false,req.flash('error','this email is not registered'))
                  }else if(user){
                    if( user.comparePassword(password,user.password)){
                      return done(null,user,req.flash('success','user is autherization'))
                    }else{
                      return done(null,false,req.flash('error','this password is incorrect'))
                    }
                  }//end of elseif user
              });//end of quary
              }//end else of typee
      }
    )
  );
  //end of local.signup
