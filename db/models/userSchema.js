import { Schema, model } from 'mongoose';
// const addressSchema = Schema({
//   housename: String,
//   pin: Number,
//   place: String,
// });
const userSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  age: { type: Number },
  email: { type: String, unique: true },
  password: { type: String },
  image: { type: String },
  address:{ type: String } 
});
const User = model('User', userSchema);
export default User;
