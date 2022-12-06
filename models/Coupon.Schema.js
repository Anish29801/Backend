import mongoose from "mongoose";
const { Schema } = mongoose;
import bcrypt from 'bcryptjs';


const CouponSchema = mongoose.Schema({
    code : {
        type : String,
        trim : true,
        maxLength : [6,"Max Length is 6"],
    },
    discount :{
        type : Number,
        default : 0
    },
    isActive :{
        type : Boolean,
        default : true
    },
    ExpiryDate : Date,

},
{
    timestamps : true,
}
)

const Coupon = mongoose.model('Coupon', CouponSchema);