import mongoose from "mongoose";
const { Schema } = mongoose;


const CollectionSchema = mongoose.Schema({
    name : {
        type : String,
        required : [true,"Name is a Required Field"],
        trim : true,
        maxlength : [100,"Max Length is 100 Character"],
    },
    
},
{
    timestamps : true
});

const Collection = mongoose.model('Collection', CollectionSchema);