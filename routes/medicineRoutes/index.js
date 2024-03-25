import express from 'express';
import Medicine from '../../db/models/medicineSchema.js';
const Router = express.Router();
Router.get('/', async (req, res) => {
  try {
    const medicines = await Medicine.find();
    return res.status(200).json(medicines);
  } catch (e) {
    return res.status(500).json(e);
  }
});
Router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const medicine= await Medicine.findById(id);
    return res.status(200).json(medicine);
  } catch (e) {
    return res.status(500).json(e);
  }
});
Router.post('/', async (req, res) => {
  try {
    const medicine = await Medicine.create(req.body);
    return res.status(201).json(medicine);
  } catch (e) {
    return res.status(500).json(e);
  }
});

Router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await Medicine.findByIdAndDelete(id);
    return res.status(201).json({ message: 'medicine deleted' });
  } catch (e) {
    return res.status(500).json(e);
  }
})
Router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await Medicine.findByIdAndUpdate(id,req.body);
    return res.status(201).json({ message: 'medicine updated' });
  } catch (e) {
    return res.status(500).json(e);
  }
})

export default Router;