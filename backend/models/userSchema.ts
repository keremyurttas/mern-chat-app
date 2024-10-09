import mongoose from 'mongoose';

const userSchema= new mongoose.Schema({
    username:{type:String,required:true},
    password:{tpye:String,required:true},
    avatar:{type:String},
    friends:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
    friendRequest:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
    onlineStatus:{type:Boolean,default:false},
    createdAt:{type:Date,default:new Date()}
})

export default mongoose.model('User',userSchema);