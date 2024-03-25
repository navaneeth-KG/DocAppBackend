import jwt from 'jsonwebtoken'
export const checkToken=(roleArray)=>{
    
   return (req,res,next)=>{
   const btoken=req.headers.authorization;
   if(!btoken){
    res.status(404).json({message:'you are not authorized'})
   }
  
   const token =btoken.split(' ')[1]
   try{
   
    const isvalid=jwt.verify(token,'SUDFGQIUDQIUGQWIUGD62G1BQWBD712B')
    console.log(isvalid);
    if(!roleArray.includes(isvalid.role)){
       return res.json({message:'you are not authorized'})
 
    }
   }catch(e){
     res.json({message:'you are not authorized'})
   }

   next()
}}