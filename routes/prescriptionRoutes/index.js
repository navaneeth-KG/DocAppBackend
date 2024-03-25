import express from 'express'
import Prescription from './../../db/models/prescriptionSchema.js';
import { checkToken } from './../../middlewares/checkToken.js';
const router = express.Router()

//create prescription
router.post('/',checkToken(['DOCTOR']),async(req,res)=>{
try{
    const body =req.body
    const prescription =await Prescription.create(body)
    return res.json({message:"prescription added"})
}catch(e){
    return res.json(e)
}
})

//get prescription by appointment id

router.get('/appointment/:id',checkToken(['DOCTOR','USER']),(req,res)=>{
    try{
       
        const {id} =req.params
        const prescription = Prescription.find({appointment:id})        
        return res.json(prescription)
    }catch(e){
        return res.json(e)
    }
    })


//delete prescription

router.delete('/:id',checkToken(['DOCTOR']),async(req,res)=>{
    try{
      const {id}=req.params
        await Prescription.findByIdAndDelete(id)
        return res.json({message:"prescription deleted"})
    }catch(e){
        return res.json(e)
    }
    })
    

//update prescription

router.patch('/:id',checkToken(['DOCTOR']),async(req,res)=>{
    try{
      const body = req.body
      const {id}=req.params
        await Prescription.findByIdAndUpdate(id,body)
        return res.json({message:"prescription updated"})
    }catch(e){
        return res.json(e)
    }
    })

    export default router
