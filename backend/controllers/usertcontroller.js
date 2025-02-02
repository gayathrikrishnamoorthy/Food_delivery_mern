import UserModel from "../models/usermodel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';

// login user 

const loginuser = async(req,res)=>
{

    const{email,password}=req.body;
    try{
        const user = await UserModel.findOne({email});
        if(!user)
        {
            return res.json({success:false,message:"User Doesn't exist"})
        }
        const ismatch = await bcrypt.compare(password,user.password)
        if(!ismatch)
        {
            return res.json({success:false,message:"Invalid credentials"})
        }

        const token= createtoken(user._id);
        res.json({success:true,token})


    }
    catch(error)
    {
        console.log(error);
         res.json({success:false,message:"Error"})
        
    }
}


const createtoken = (id)=>
{
   return  jwt.sign({id},process.env.JWT_SECRET)
}
//register user 

const regsisteruser = async(req,res)=>
{


    const {name,password,email}=req.body;
    try{

        //check if user already exist
        const exist= await UserModel.findOne({email});
        if(exist)
        {
            return res.json({success:false,message:"User already exist"})
        }
        // validate email format strong password

        if(!validator.isEmail(email))
        {
            return res.json({success:false,message:"Please enter valid email"})
        }
        if(password.length<8)
        {
            return res.json({success:false,message:"Password must include atleast 8 characters"})
        }

        //hashing user password

        const salt= await bcrypt.genSalt(10)
        const hashedpw=await bcrypt.hash(password,salt)

        const newuser= new UserModel({
            name:name,
            email:email,
            password:hashedpw
        })

        const user = await newuser.save();

        const token = createtoken(user._id)
        res.json({success:true,token});


    }
    catch(error)
    {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}

export {loginuser,regsisteruser};