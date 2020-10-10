const app= require('express').Router();
const {validationResult,check} = require('express-validator');
const User = require('../models/user');
const cloud = require('cloudinary').v2;
const bcrypt =require('bcrypt');

cloud.config({
    cloud_name:'practicecloud',
    api_key:'264929259734659',
    api_secret:'Im6daMGYzsdILbZUqKoHTs5ekEk'
 });


app.post('/',[
    check('uname','User Name cannot be empty !').isEmpty().isAlphanumeric(),
    check('name','Name cannot be empty or it must include only letters !').isEmpty().isAlpha(),
    check('email','Email cannot be Empty').isEmail().custom((email)=>{
        return User.findOne({email})
        .then(user => {if(user) return Promise.reject("email is in use") })
    }),
    check('pwd','It should min 3 length ').isLength({min:3}).isAlphanumeric().custom((pwd,{req})=>{
        if(pwd != req.body.pwd2) throw new Error(' password do not match !');
        return true;
    })
],(req,res)=>{
    const error= validationResult(req);
    if(!error.errors){
        return res.json({
            error,old:req.body
        });
    }
    else{
        const newuser= new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.pwd,
            username:req.body.username,
            profile:null,
        });
        const file=req.files.pic;
        cloud.uploader.upload(file.tempFilePath,(err,result)=>{
            if(err) return res.json(err);
            newuser.profile=result.url;
            bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(newuser.password,salt,(err,hashp)=>{
                    if(err) throw error;
                    newuser.password= hashp;
                    newuser.save()
                    .then((user)=> res.send(`Registered now login\n <img src=${user.profile}>`))
                    .catch(err=>console.log("error in hash"));
                });
            }); 
        });
    }
});

module.exports=app;




