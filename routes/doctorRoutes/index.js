import express, { json } from 'express';
import Doctor from '../../db/models/doctorSchema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const Router = express.Router();

Router.post('/login', async (req, res) => {
  try {
    const body = req.body;
    const doctor = await Doctor.findOne({ email: body.email });
    if (!doctor) {
      return res.json({ message: 'email or password incorrect' });
    }
    // console.log('working');
    // console.log(doctor);
    // console.log(doctor.password, doctor);
    const isMatching = await bcrypt.compare(body.password, doctor.password);
    if (!isMatching) {
      res.json({ message: 'email or password incorrect' });
    }
    // console.log('hello');
    const token = jwt.sign(
      { id: doctor._id, role: 'DOCTOR' },
      'SUDFGQIUDQIUGQWIUGD62G1BQWBD712B',
      { expiresIn: '2d' }
    );
    res.status(200).json({ message: 'logged in', token });
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});
Router.post('/signup', async (req, res) => {
  try {
    const body = req.body;
    const doctor = await Doctor.findOne({ email: body.email });
    if (doctor) {
      return res
        .status(400)
        .json({ message: 'doctor with this email already exists' });
    }

    if (body.password != body.confirmPassword) {
      return res.status(400).json({ message: 'password doesnt match' });
    }
    const hashedPassword = await bcrypt.hash(body.password, 2);
    body.password = hashedPassword;
    const addDoctor = await Doctor.create(body);
    res.status(201).json({ message: 'doctor added' });
  } catch (e) {
    res.status(500).json(e);
  }
});

//list doc by department id
Router.get('/department/:depId', async (req, res) => {
  try {
    const { depId } = req.params;
    const doctors = await Doctor.find({ department: depId }).populate('department');
    return res.status(200).json(doctors);
  } catch (e) {
    return res.status(500).json(e);
  }
});

//get doc by id

Router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findById(id);
    return res.status(200).json(doctor);
  } catch (e) {
    return res.status(500).json(e);
  }
});

export default Router;
