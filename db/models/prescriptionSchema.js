import { Schema, model } from 'mongoose';

const prescriptionSchema = Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  doctor: { type: Schema.Types.ObjectId, ref: 'Doctor' },
  medicines: [{ type: Schema.Types.ObjectId, ref: 'Medicine' }],
  appointment: { type: Schema.Types.ObjectId, ref: 'Appointment' },
  message: String,
});
const Prescription = model('Prescription', prescriptionSchema);
export default Prescription;
