const app= require('express').Router();
const User= require('../models/user');
const passport = require('passport');

app.post('/',passport.authenticate('local',{
    successRedirect:'/dash',
    failureRedirect:'/login/fail',
}));

app.get('/fail',(req,res)=>{
    res.send("login failed");
});
app.get('/success',(req,res)=>{
    res.send("login success");
});

module.exports=app;