import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
import axios from "axios";
export const Storecontext=createContext(null)

const Storecontextprovider =(props)=>
{

    const  [cartitems,setcartitems]=useState({});
    const url="http://localhost:4000";
    const[token,settoken]=useState("")
    const[food_list,setfoodlist]=useState([])
    const addtocart = async (itemId)=>
    {

        //creating new entry
        if(!cartitems[itemId])
        {
            setcartitems((prev)=>({...prev,[itemId]:1}))
        }
        else 
        {
            setcartitems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }

        if(token)
        {
            await axios.post(url+'/api/cart/add',{itemId},{headers:{token}})
        }

    }
    const removefromcart =async (itemId)=>
    {
        setcartitems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(token)
        {
            await axios.post(url+'/api/cart/remove',{itemId},{headers:{token}})
        }
    }
 
    const gettotalcart =()=>
    {
        let totalamt=0;
        for(const item in cartitems)
        {

            if(cartitems[item]>0)
            {
                let iteminfo=food_list.find((product)=>product._id===item);
                totalamt+=iteminfo.price*cartitems[item];

            }

        }

        return totalamt;
    }


    const fetchfoodlist = async()=>
    {
        const res= await axios.get(url+'/api/food/list')
        setfoodlist(res.data.data)
    }

    const loadcartdata = async(token)=>
    {
        const res= await axios.post(url+'/api/cart/get',{},{headers:{token}})
        setcartitems(res.data.cartdata);
    }
    useEffect(()=>
    {
       
        async function loaddata()
        {
            await fetchfoodlist()
        
        if(localStorage.getItem("token"))
            {
                settoken(localStorage.getItem("token"));
                await loadcartdata(localStorage.getItem("token"))
    
            }
        }

            loaddata()

    },[])
    const contextvalue ={

        food_list,cartitems,setcartitems,addtocart,removefromcart,gettotalcart,url,token,settoken
    }
    return (
        <Storecontext.Provider value={contextvalue}>
            {props.children}
        </Storecontext.Provider>
    )
}
export default Storecontextprovider;