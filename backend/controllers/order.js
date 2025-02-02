import ordermodel from "../models/oredermodel.js";
import UserModel from "../models/usermodel.js";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


//placing user order from frontend 

const placeorder = async (req,res)=>
{
    const frontend_url="http://localhost:5174";

    try {

        const neworder = new ordermodel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address,
        })

        await neworder.save();
        await UserModel.findByIdAndUpdate(req.body.userId,{cartdata:{}});

        const line_items = req.body.items.map((item)=>({

            price_data:{
                currency:"inr",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100*80
            },
            quantity:item.quantity
        }))

        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery charges"
                },
                unit_amount:2*100*80
            },
            quantity:1
        })

        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url:`${frontend_url}/verify?success=true&orderId=${neworder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${neworder._id}`
        })

        res.json({success:true,session_url:session.url})
        
    } catch (error) {
        
        console.log(error);
        res.json({success:false,message:"Error"})

        
    }

}

const verifyorder = async(req,res)=>
{

    const {orderId,success}=req.body;
    try {
        if(success==="true")
        {
            await ordermodel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,message:"Paid"})
        }
        else 
        {
            await ordermodel.findByIdAndDelete(orderId);
            res.json({success:false,message:"Not paid"})

        }
        

    } catch (error) {
        
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}

// user order for frontend


const userorders = async(req,res)=>
{
    try {

        const orders = await ordermodel.find({userId:req.body.userId})
        res.json({success:true,data:orders})
        
    } catch (error) {
        
        console.log(error);
        res.json({success:false,message:"Error"})

        
    }

}
//listing orders for admin panel

const listorder = async(req,res)=>
{
    try{
        const orders = await ordermodel.find({});
        res.json({success:true,data:orders})

    }
    catch(error)
    {
        console.log(error);
        res.json({success:false,message:"Error"})

        
    }

}

//update order 

    const updatests=  async(req,res)=>
    {

        try {

            await ordermodel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
            res.json({success:true,message:"Status updated"})
            
        } catch (error) {
            console.log(error);
            res.json({success:false,message:"Error"})

            
        }
    }


export {placeorder,verifyorder,userorders,listorder,updatests}