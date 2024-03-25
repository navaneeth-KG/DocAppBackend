import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from './../../db/models/userSchema.js';

const routes = express.Router();

routes.post('/signup', async (req, res) => {
  try {
    const body = req.body;
    const user = await User.findOne({ email: body.email });
    if (user) {
      return res.json({ message: 'user already exists please login' });
    }
    if (body.password != body.confirmPassword) {
      return res.json({ message: 'check your password again' });
    }
    const hashedPassword = await bcrypt.hash(body.password, 2);
    body.password = hashedPassword;
    const newUser = await User.create(body);
    return res.json(newUser);
  } catch (e) {
    return res.json(e);
  }
});
routes.post('/login', async (req, res) => {
  try {
    const body = req.body;
    const user = await User.findOne({ email: body.email });
    if (!user) {
      return res.json({ message: 'email or password incorrect' });
    }
    const isMatching = bcrypt.compare(body.password, user.password);
    if (!isMatching) {
      res.json({ message: 'email or password incorrect' });
    }
    const token = jwt.sign(
      { id: user._id, role: 'USER' },
      'SUDFGQIUDQIUGQWIUGD62G1BQWBD712B',
      { expiresIn: '2d' }
    );
    res.status(200).json({ message: 'logged in', token });
  } catch (e) {
    return res.json(e);
  }
});

routes.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch {
    res.json();
  }
});
export default routes;
