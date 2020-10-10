const app= require('express').Router();

app.get('/',(req,res)=>{
    req.logout();
    res.send("logout successs");
});

module.exports=app;