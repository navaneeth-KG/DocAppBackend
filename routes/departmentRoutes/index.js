import express from 'express';
import Department from '../../db/models/departmentSchema.js';
import { checkToken } from '../../middlewares/checkToken.js';
const Router = express.Router();



Router.get('/',async (req, res) => {
  console.log('working');
  try {
    const departments = await Department.find();
    return res.status(200).json(departments);
  } catch (e) {
    return res.status(500).json(e);
  }
});


Router.get('/:id',  checkToken(['DOCTOR','USER']),async (req, res) => {
  try {
    const { id } = req.params;

    const department = await Department.findById(id);
    return res.status(200).json(department);
  } catch (e) {
    return res.status(500).json(e);
  }
});

Router.post('/',checkToken(['DOCTOR']), async (req, res) => {
  try {
    const department = await Department.create(req.body);
    return res.status(201).json(department);
  } catch (e) {
    return res.status(500).json(e);
  }
});

Router.delete('/:id',checkToken(['DOCTOR']), async (req, res) => {
  try {
    const { id } = req.params;

    await Department.findByIdAndDelete(id);
    return res.status(201).json({ message: 'department deleted' });
  } catch (e) {
    return res.status(500).json(e);
  }
});

Router.patch('/:id',checkToken(['DOCTOR']), async (req, res) => {
  try {
    const { id } = req.params;

    await Department.findByIdAndUpdate(id, req.body);
    return res.status(201).json({ message: 'department updated' });
  } catch (e) {
    return res.status(500).json(e);
  }
});

export default Router;
