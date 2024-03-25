import { Schema, model } from 'mongoose';


const doctorSchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    unique:true,
    required:true
    
  },
  image: {
    type: String,
  },
  password:{type:String},
  department:{type:Schema.Types.ObjectId,ref:'Department'},
});

const Doctor = model('Doctor',doctorSchema)
export default Doctor
