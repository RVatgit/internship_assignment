const app= require('express').Router();
const User= require('../models/user');
const bcrypt= require('bcrypt');

app.get('/',(req,res)=>{
    if(req.isAuthenticated()){
        const obj=req.user._doc;
        console.log(obj);
        delete obj["password"];
        delete obj["_id"];
        console.log(obj);
        res.status(200).json(["You are Authenticated User",obj]);
    }
    else res.send('login first');
});



app.post('/',(req,res)=>{
    if(req.isAuthenticated()){
        delete req.body['email'];
        User.findByIdAndUpdate(req.user._id,req.body)
        .then(newuser=>{
            if(req.body.pwd && req.body.pwd!=req.body.pwd2) return res.send(" password not matched");
            if(req.body.pwd){
                bcrypt.genSalt(10,(err,salt)=>{
                    bcrypt.hash(req.body.pwd,salt,(err,hashp)=>{
                        if(err) throw error;
                        newuser.password= hashp;
                        newuser.save()
                        .then((user)=> res.status(200).json("Password updated now login again"))
                        .catch(err=>console.log(err,"error in edit hash"));
                        req.logout();
                    });
                }); 
            }
            else return res.status(200).json("updated , it may take some time to see changes ");
        })
        .catch(e=>console.log("error in update ",e));
    }
    else res.send('login first not authorised ');
});

app.delete('/',(req,res)=>{
    if(req.isAuthenticated()){
        User.findByIdAndDelete(req.user._id)
        .then(()=>{
            req.logout();
            res.status(200).json("deleted successfully");
        })
        .catch(e=>console.log(e,"eerror ind delete"));
    }
    else res.send('login first not authorised ');
});



module.exports=app;