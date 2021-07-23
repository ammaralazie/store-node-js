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
