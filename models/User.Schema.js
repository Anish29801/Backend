
const mongoose = require('mongoose');
const { Schema } = mongoose;
import Roles from ("../utils/Roles");
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

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
},
{
    timestamps : true,
},
)
User_Schema.pre('save',async function (next){
    if(!this.modifed("password")) {next();}
this.password = await bcrypt.hash(this.password,10)
next();
})

User_Schema.methods = {
    //compare password
    comparePassword: async function (Password) {
        return await bcrypt.compare(Password, this.password)
    },

    //generate JWT TOKEN
    getJwtToken: function () {
        return jwt.sign(
            {
                _id: this._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.SESSION
            }
        )
    },

    //generate a forget password token
    getForgetPasswordToken : function (){
            const PwdToken = crypto.randomBytes(15).toString('hex')
            this.ForgotPasswordToken = crypto.createhash("sha256").update(PwdToken).digest('hex');
            this.ForgotPasswordExpiry = Date.now() + 2*60*60*100;
            return PwdToken;
    },
}
const User = mongoose.model('User', User_Schema);