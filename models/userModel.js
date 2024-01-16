const mongoose =require("mongoose")

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    }, address:{
        type:String,
        required:true
    }
},{timestamps:true})

const userModel=mongoose.model('tekki_users',userSchema);

module.exports={userModel};