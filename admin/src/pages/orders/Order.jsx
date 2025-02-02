import React, { useEffect, useState } from 'react'
import './orders.css'
import {toast} from 'react-toastify'
import axios from 'axios'
import { assets } from '../../assets/assets'

export const Order = ({url}) => {

  const [orders,setorders]=useState([]);

  const fetchorders = async()=>
  {


    const res= await axios.get(url+'/api/order/list')
    if(res.data.success)
    {
      setorders(res.data.data)
     
      

    }
    else 
    {
      toast.error("Error")

    }

  }

  const statushandler = async(e,orderId)=>

  {

    const res= await axios.post(url+'/api/order/status',{
      orderId,
      status:e.target.value
    })
    if(res.data.success)
    {
      await fetchorders()
    }

    

  }
  useEffect(()=>
  {
    fetchorders()

  },[])
  return (
    <div className='order add'>
      <h3>Order page</h3>
      <div className="order-list">
        {orders.map((order,i)=>
        (
          <div key={i} className='orderitem'>
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className='order-item-food'>
                {order.items.map((item,i)=>
                {
                    if(i===order.items.length-1)
                    {
                      return item.name+" x"+item.quantity
                    }
                    else 
                    {
                      return item.name+" x"+item.quantity +","
                    }

                })}
              </p>
              <p className='order-item-name'>
                {order.address.firstname+" " + order.address.lastname }</p>
                <div className='order-item-address'>
                 <p> {order.address.street+ ","}
                </p>
                <p>{order.address.city+ "," +order.address.state+ ","+order.address.country+","+order.address.zipcode}</p>
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
            </div>
            <p>Items:{order.items.length}</p>
            <p>$ {order.amount}</p>
                <select onChange={(e)=>statushandler(e,order._id)} value={order.status}>
                  <option value="Food processing">Food processing</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
            </div>
        ))}
      </div>
    </div>
  )
}
