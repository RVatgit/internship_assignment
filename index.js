const express = require('express');
const session = require('express-session');
const mongoose =require('mongoose');
const app = express();
const fileupload = require('express-fileupload');
const mongostore = require('connect-mongo')(session);
const passport = require('passport');


const connection = mongoose.createConnection('mongodb://localhost/internship',{
    useUnifiedTopology:true,
    useNewUrlParser:true
});
mongoose.connect('mongodb://localhost/internship',{
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false
});


app.use(express.urlencoded({extended:false}));
app.use(fileupload({
    useTempFiles:true,
    tempFileDir:'./tmp'
}));

const sessionstore = new mongostore({mongooseConnection:connection,collection:'session'});

app.use(session({
    secret:"shklaskfhslkdfsdf",
    saveUninitialized:false,
    resave:false,
    store: sessionstore,
    cookie:{
        maxAge:60*24*60*1000
    }
}));


require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());


app.get('/',(req,res)=>{
    res.send("hello");
});

app.use('/login',require('./routes/signin'));
app.use('/logout',require('./routes/logout'));
app.use('/register',require('./routes/signup'));
app.use('/dash',require('./routes/dash'));

app.listen(process.env.port||3000);


