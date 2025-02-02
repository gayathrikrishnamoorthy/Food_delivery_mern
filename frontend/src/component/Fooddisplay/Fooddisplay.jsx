import React from 'react'
import './food.css'
import { useContext } from 'react'
import { Storecontext } from '../../context/storecontext'
import Fooditem from '../food-item/Fooditem'

export default function Fooddisplay({category}) {

    const {food_list}=useContext(Storecontext)
  return (


    <div className='food-display' id='food-display'>
        <h2>Top dishes near you</h2>
        <div className="food-display-list">
            {food_list.map((item,i)=>
            {
              if(category==="All" || category===item.category)
              {
                return <Fooditem key={i} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
              }
                  
            })}
        </div>

    </div>
  )
}
