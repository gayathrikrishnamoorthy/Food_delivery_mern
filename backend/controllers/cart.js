import UserModel from "../models/usermodel.js";
 
//add to cart

const addtocart = async(req,res)=>
{
        try 
        {
            let userdata = await UserModel.findById(req.body.userId)
            let cartdata = await userdata.cartdata;
            if(!cartdata[req.body.itemId])
            {
                cartdata[req.body.itemId] = 1

            }
            else
            {
                cartdata[req.body.itemId]+=1
            }
            await UserModel.findByIdAndUpdate(req.body.userId,{cartdata});
            res.json({success:true,message:"Added to cart"});
        }
        catch(error)
        {
            console.log(error);
            res.json({success:false,message:"Error"});

            
        }
}

//remove

const removecart = async(req,res)=>
{


    try {

        let userdata = await UserModel.findById(req.body.userId)
        let cartdata = await userdata.cartdata
        if(cartdata[req.body.itemId]>0)
        {
            cartdata[req.body.itemId]-=1;

        }

        await UserModel.findByIdAndUpdate(req.body.userId,{cartdata});
        res.json({success:true,message:"Removed to cart"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});

        
    }
}

//fetch user cart data

const getcart=  async(req,res)=>
{

    try {

        let userdata= await UserModel.findById(req.body.userId);
        let cartdata = await userdata.cartdata;
        res.json({success:true,cartdata})

        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

export {addtocart,removecart,getcart};