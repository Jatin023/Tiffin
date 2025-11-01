const express=require('express');
const cors=require('cors');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const auth=require('../middleware/auth');
const router=express.Router();
const User=require('../models/users')

router.post('/signup',async(req,res)=>{
    try{
        const {name,email,password,role}=req.body;
        const existing=await User.findOne({email});
        if(existing) return res.status(400).json({msg:'user aleredy exits'});

        const hashed=await bcrypt.hash(password,10);
        const user=await User.create({name,email,password:hashed,role:role|| "customer"})
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});
        res.json({
        msg: "Signup successful",
       user: { _id: user._id, name: user.name, email: user.email, role: user.role },
       token
});
    }catch(error)
    {
        res.status(500).json({msg:"server error",error:error.message});
    }
})

router.post('/login',async (req,res)=>{
    
    
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user) return res.status(400).json({msg:"Invalid crendtials"});
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({msg:"Invalid crendtials"});

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});
       res.json({
  msg: "login successfully",
  user: {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
  },
  token
});


    }catch(error)
    {
        res.status(500).json({msg:"server error",error:error.message});
    }
});

module.exports = router;