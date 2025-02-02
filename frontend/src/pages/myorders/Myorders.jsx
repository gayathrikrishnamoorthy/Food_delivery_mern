import React, { useContext, useEffect, useState } from 'react'
import './myorder.css'
import { Storecontext } from '../../context/storecontext'
import axios from 'axios'
import { assets } from '../../assets/assets'
export const Myorders = () => {

    const[data,setdata]=useState([])
    const {url,token} = useContext(Storecontext);


    const fetchorders = async()=>
    {
        const res=await axios.post(url+'/api/order/userorders',{},{headers:{token}})
        setdata(res.data.data);
        
        
        
        
    }

    useEffect(()=>
    {
        if(token)
        {
            fetchorders();
        }


    },[token])

  return (
    <div className='myorders' >
        <h2>My Orders</h2>
        <div className="container">
            {data.map((order,i)=>
            {
                return (
                    <div key={i} className="my-order-orders">
                        <img src={assets.parcel_icon} alt="" />
                       <p>{order.items.map((item,i)=>
                    {
                        if(i===order.items.length-1)
                        {
                            return item.name+ " x " +item.quantity
                        }
                        else 
                        {
                            return item.name+ " x " +item.quantity+","

                        }
                    })}</p>
                    <p>${order.amount}.00</p>
                    <p>Items:{order.items.length}</p>
                    <p><span>&#x25cf;</span><b>{order.status}</b></p>
                    <button onClick={fetchorders} >Track Order</button>
                    

                    

                    
                
            
                    
                    </div>
                )

            })}
        </div>

    </div>
  )
}
