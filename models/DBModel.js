
const mongoose = require('mongoose');
const { Schema } = mongoose;
import Roles from ("../utils/Roles");

const User_Schema = new Schema({
    name : {
        type : String,
        required : [true, "Name is Required"],
        maxLength : [20,"Max Length is 20"],
        trim : true
    },
    email : {
        type : String,
        required : [true, "Email is Required"],
        unique : true
    },
    password : {
        type : String,
        required : [true, "Password is Required"],
        minLength : [8,"Min Length is 8"],
        select : false
    },
    role : {
        type : String,
        enum :Object.values(Roles),
        default: Roles.Customer,
    },
    ForgotPasswordToken : String,
    ForgotPasswordExpiry : Date,
})



const Store = mongoose.model('User', User_Schema);