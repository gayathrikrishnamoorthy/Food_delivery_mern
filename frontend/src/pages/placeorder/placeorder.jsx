import React, { useContext, useEffect, useState } from 'react'
import './place.css'
import { Storecontext } from '../../context/storecontext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Placeorder() {

  const{gettotalcart,token,food_list,cartitems,url}=useContext(Storecontext)
 

  const[data,setdata]=useState({
    firstname:"",
    lastname:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })

  const onchangehandler = (e)=>
  {
    const name=e.target.name;
    const value = e.target.value;
    setdata(data=>({...data,[name]:value}))
  }

  const placeorder = async(e)=>
  {
       e.preventDefault();
       let orderitems =[];
       food_list.map((item)=>
      {
        if(cartitems[item._id]>0)
        {
          let iteminfo = item;
          iteminfo["quantity"]=cartitems[item._id];
          orderitems.push(iteminfo)
        }
      })
      
      let orderdata = {
        address:data,
        items:orderitems,
        amount:gettotalcart()+2
      }
      let res = await axios.post(url+'/api/order/place',orderdata,{headers:{token}})
      if(res.data.success)
      {
        const{session_url}=res.data;
        window.location.replace(session_url);
      }
      else 
      {
        alert("Error");
      }
  }

  const navigate = useNavigate();

  useEffect(()=>
  {

    if(!token)
    {
        navigate('/cart')
    }
    else if(gettotalcart()===0)
    {
      navigate('/cart')
    }

  },[token])
 
  return (
   <form onSubmit={placeorder} className='place-order'>
    <div className="order-left">
      <p className="title">Delivery Information</p>
      <div className="multifields">
        <input required  name='firstname' onChange={onchangehandler} value={data.firstname} type="text" placeholder='First Name'/>
        <input required name='lastname' onChange={onchangehandler} value={data.lastname} type="text"placeholder='Last Name' />
      </div>
     <input required name='email' onChange={onchangehandler} value={data.email} type="email" placeholder='Email address'/>
     <input required name='street' onChange={onchangehandler} value={data.street} type="text" placeholder='Street' />
     <div className="multifields">
        <input required name='city' onChange={onchangehandler} value={data.city} type="text" placeholder='City'/>
        <input required name='state' onChange={onchangehandler} value={data.state}  type="text"placeholder='State' />
      </div>
      <div className="multifields">
        <input required name='zipcode' onChange={onchangehandler} value={data.zipcode} type="text" placeholder='Zipcode'/>
        <input required name='country' onChange={onchangehandler} value={data.country} type="text"placeholder='Country' />
      </div>
      <input required name='phone' onChange={onchangehandler} value={data.phone} type="text" placeholder='Phone'/>

    </div>
    <div className="place-right">
    <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>$ {gettotalcart()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>$ {gettotalcart()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
            <b>Total</b>
            <b>$ {gettotalcart()===0?0:gettotalcart()+2}</b>
            </div>
            
          </div>
          <button type='submit' onClick={()=>navigate('/order')}>PROCEED TO PAYMENT</button>
        </div>
    </div>
   </form>
  )
}
