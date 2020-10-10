const mongoose = require('mongoose');
const passport = require('passport');
const local = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt= require('bcrypt');


const strategy =new local({
    usernameField:'username',
    passwordField:'pwd'
},(username,password,done)=>{
    User.findOne({username:username})
    .then((user)=>{
        if(!user) return done(null,false);
        bcrypt.compare(password,user.password,(err,ism)=>{
            if(err||!ism) return done(null,false);
            return done(null,user);
        });
    })
    .catch(err=>console.log("error in passpord match",err));
});

passport.use(strategy);
passport.serializeUser((user, done) =>{
    done(null, user.id);
});  
passport.deserializeUser((id, done)=> {
    User.findById(id, (err, user)=>   {
    done(err, user);
});
});