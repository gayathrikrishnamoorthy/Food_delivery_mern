import React from 'react'
import './exploremenu.css'
import { menu_list } from '../../assets/assets'

export const Exploremenu = ({category,setcategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
<h1>Explore our menu</h1>
<p className='explore-menu-text'>Choose from a diverse menu featuring a delectable array of dishes.</p>
<div className="explore-menu-list">
    {menu_list.map((item,i)=>
    {
        return (
            <div onClick={()=>setcategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={i} className='explore-menu-list-item'>
                    <img className={category===item.menu_name?"Active":''} src={item.menu_image}/>
                    <p>{item.menu_name}</p>
                </div>
        )
    })}
                </div>
                <hr/>
    </div>
  )
}
