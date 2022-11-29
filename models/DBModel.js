
const mongoose = require('mongoose');
const { Schema } = mongoose;

const User_Schema = new Schema({
    name : {
        type : String,
        required : [true, "Name is Required"],
        maxLength : [20,"Max Length is 20"],
        trim : true
    }
})



const Store = mongoose.model('User', User_Schema);