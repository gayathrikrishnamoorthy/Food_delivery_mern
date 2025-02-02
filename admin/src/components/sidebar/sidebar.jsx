import React from 'react'
import  './sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'
export const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="options">
            <NavLink to='/add' className="option">
                <img src={assets.add_icon} alt="" />
                <p>Add Items</p>
            </NavLink>
            <NavLink  to='/list' className="option">
                <img src={assets.order_icon} alt="" />
                <p>List Items</p>
            </NavLink>
            <NavLink   to='/orders' className="option">
                <img src={assets.order_icon} alt="" />
                <p>Orders</p>
            </NavLink>
        </div>
    </div>
  )
}
