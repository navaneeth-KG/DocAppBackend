import { Schema,model } from "mongoose";
const medicineSchema= Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    image:{
        type:String,
       
    },
    price:{
        type:Number,
        required:true
    },
    expirydate:{
        type:Date,
        
    }
})
const Medicine = model('Medicine',medicineSchema)
export default Medicine