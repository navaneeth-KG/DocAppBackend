import { Schema, model } from 'mongoose';

const appointmentSchema = Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' ,required:true},
  doctor: { type: Schema.Types.ObjectId, ref: 'Doctor' ,required:true},
  slot: { type: Schema.Types.ObjectId, ref: 'Slot' ,required:true},
  status: {
    type: String,
    default: 'booked',
    enum: ['booked', 'cancelled'],
  },
});

const Appointment = model('Appointment', appointmentSchema);
export default Appointment;
