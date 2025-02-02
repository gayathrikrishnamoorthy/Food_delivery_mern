import React, { useContext, useState } from 'react'
import './fooditem.css'
import { assets } from '../../assets/assets'
import { Storecontext } from '../../context/storecontext'
export default function Fooditem({id,name,price,description,image}) {

    
    const{cartitems,addtocart,removefromcart,url}=useContext(Storecontext)
  return (
    <div className='food-item'>
        <div className="food-item-img-container">
            <img className='food-item-img' src={url+'/images/'+image} alt="" />
            {!cartitems[id]?
            <img className='add' onClick={()=>addtocart(id)} src={assets.add_icon_white}/>:
        <div className='food-item-counter'>
            <img onClick={()=>removefromcart(id)} src={assets.remove_icon_red}/>
            <p>{cartitems[id]}</p>
            <img  onClick={()=>addtocart(id)} src={assets.add_icon_green}/>
            </div>}
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className='food-desc'>{description}</p>
            <p className="food-price">$ {price}</p>
        </div>

    </div>
  )
}
