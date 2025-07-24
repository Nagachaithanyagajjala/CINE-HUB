const mongoose = require('mongoose');

let Registeruser = new mongoose.Schema({
    username :{
        type : String,
        required : true,
    },
    email :{
        type : String,
        required : true,
        unique : true,
    },
    password :{
        type : String,
        required:true,
    },
    confirmpassword : {
        type : String,
        required : true,
    },
    likedMovies: Array,
    likedMoviesids:Array,
    rented: Array,
    rentedids:Array,
})

module.exports = mongoose.model('Registeruser',Registeruser)