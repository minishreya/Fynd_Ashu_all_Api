const Mongoose = require('mongoose')
const Schema = Mongoose.Schema


const UserSchema = new Schema({
    email:{type:String , unique:true , required:true},
    password:{type:String,required:true},
    verified:{type:Boolean , default:false},
    createdate:{type:Date , default : new Date()},
    phone:{type:Number},
    role: {type: String, default: "admin", required: true}
})

const Usermodel = Mongoose.model("users",UserSchema)

module.exports =  Usermodel