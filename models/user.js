const mongoose = require('mongoose');

const schema= mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    profile: String,
});

module.exports= mongoose.model('internship_user',schema);