import React, { useContext } from 'react'
import './cart.css'
import { Storecontext } from '../../context/storecontext'
import { useNavigate } from 'react-router-dom'

export const Cart = () => {

  const{cartitems,food_list,removefromcart,gettotalcart,url}=useContext(Storecontext)
  const navigate=useNavigate();

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br/>
        <hr/>
        {food_list.map((item,i)=>{
          if(cartitems[item._id]>0)
          {
            return (
              <div>
              <div className='cart-title cart-items-item'>
                      <img src={url+'/images/'+item.image} alt="" />
                      <p>{item.name}</p>
                      <p>${item.price}</p>
                      <p>{cartitems[item._id]}</p>
                      <p>${item.price *cartitems[item._id] }</p>
                      <p onClick={()=>removefromcart(item._id)} className='cross'>x</p>
                </div>
                <hr/>
                </div>
               
            )
          }
        })}
      </div>
      <div className="cart-bottom">
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
          <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className="promo-input">
              <input type="text"  placeholder='promo code'/>
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
