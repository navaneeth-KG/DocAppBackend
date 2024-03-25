import express from 'express';
import Slot from './../../db/models/slotSchema.js';

const router = express.Router();

//create slot

router.post('/', async (req, res) => {
  try {
    const body = req.body;
    const slot = await Slot.create(body);
    return res.json({message:"slot added"});
   } catch (e) {
    res.json(e);
  }
})

//list slot by doctor id
router.get('/doctor/:docId', async(req, res) => {
  try {
    const { docId } = req.params;
    const slots = await Slot.find({ doctor: docId })
    return res.json(slots)
   } catch (e) {
    res.json(e)
  }
});

//update slot

router.patch('/:id', async(req, res) => {
  try {
    const { id } = req.params;
    await Slot.findByIdAndUpdate(id);
    return res.json({ message: 'slot updated' })
  } catch (e) {
    res.json(e);
  }
});

//deleteslot

router.delete('/:id', async(req, res) => {
  try {
    const { id } = req.params;
     await Slot.findByIdAndDelete(id);
    return res.json({ message: 'slot deleted' });
  } catch (e) {
    res.json(e);
  }
});
//get slot by id
router.get('/:id', async(req, res) => {
  try {
    const { id } = req.params;
    const slot  = await Slot.findById(id);
    return res.json(slot);
  } catch (e) {
    res.json(e);
  }
});


export default router;
