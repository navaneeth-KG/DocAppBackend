import { Schema, model } from 'mongoose';
const orderSchema = Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  medicines: [{ type: Schema.Types.ObjectId, ref: 'Medicine' }],
  totalPrice:{
    type:Number,
    required:true
  }
});
const Order = model('Order', orderSchema);
export default Order;
