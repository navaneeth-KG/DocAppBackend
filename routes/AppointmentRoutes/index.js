import express from 'express';
import Slot from '../../db/models/slotSchema.js';
import Appointment from './../../db/models/appointmentSchema.js';
import nodemailer from 'nodemailer';

const router = express.Router();

//take appointment ---slot booking

router.post('/', async (req, res) => {
  try {
    const body = req.body;
    // console.log(req.body);
    const appointment = await Appointment.create({ ...body, status: 'booked' });
    console.log(appointment);
    await Slot.findByIdAndUpdate(req.body.slot, {
      status: 'booked',
    });

    //mail
    // const transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: 'navaneethkg99@gmail.com',
    //     pass: 'flcq obmr hcyt avca',
    //   },
    // });
    // const mailOptions = {
    //   from: 'navaneethkg99@gmail.com',
    //   to: 'navaneethkg99@gmail.com',
    //   subject: 'confirm mail',
    //   text: 'your booking has been confirmed',
    // };

    // transporter.sendMail(mailOptions);
    console.log(appointment);
    // return res.json(appointment);
    return res.json({message:"appointment booked"});
  } catch (e) {
    return res.json(e);
  }
});

//list appointment by doc id

router.get('/doctor/:docID', async (req, res) => {
  try {
    const { docID } = req.params;
    const appointments = await Appointment.find({ doctor: docID })
      .populate('user')
      .populate('slot');
    return res.json(appointments);
  } catch (e) {
    res.json(e);
  }
});

//list appointment by user id

router.get('/user/:userID', async (req, res) => {
  try {
    const { userID } = req.params;
    const appointments = await Appointment.find({ user: userID }).populate(["user","doctor","slot"]);
    return res.json(appointments);
  } catch (e) {
    return res.json(e);
  }
});

router.get('/pdf/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate([
      'slot',
      'user',
      'doctor',
    ]);
    console.log(appointment);
    res.render('pdf.ejs',{appointment});
  } catch (e) {
    res.json(e);
  }
});

router.get('/app/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findOne({ _id: id })
      .populate('slot')
      .populate('user');
    res.json(appointment);
  } catch (e) {
    res.json(e);
  }
});

//update appointment

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findByIdAndUpdate(id, {
      status: 'cancelled',
    });
    await Slot.findByIdAndUpdate(appointment.slot, { status: 'free' });
    return res.json({message:"appointment cancelled"});
  } catch (e) {
    return res.json(e);
  }
});

//get appointment by slot id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findOne({ slot: id })
      .populate('slot')
      .populate('doctor');
    res.json(appointment);
  } catch (e) {
    res.json(e);
  }
});


router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findOne({ slot: id })
      .populate('slot')
      .populate('doctor');
    res.json(appointment);
  } catch (e) {
    res.json(e);
  }
});




export default router;
