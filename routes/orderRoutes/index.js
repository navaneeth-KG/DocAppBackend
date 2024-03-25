
import express from 'express';
import Order from '../../db/models/orderSchema.js';
const Router = express.Router();
Router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    return res.status(200).json(orders);
  } catch (e) {
    return res.status(500).json(e);
  }
});
Router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const order= await Order.findById(id);
    return res.status(200).json(order);
  } catch (e) {
    return res.status(500).json(e);
  }
});
Router.post('/', async (req, res) => {
  try {
    const order = await Order.create(req.body);
    return res.status(201).json(order);
  } catch (e) {
    return res.status(500).json(e);
  }
});

Router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await Order.findByIdAndDelete(id);
    return res.status(201).json({ message: 'order deleted' });
  } catch (e) {
    return res.status(500).json(e);
  }
})
Router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await Order.findByIdAndUpdate(id,req.body);
    return res.status(201).json({ message: 'order updated' });
  } catch (e) {
    return res.status(500).json(e);
  }
})

export default Router;