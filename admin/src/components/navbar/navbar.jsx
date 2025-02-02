import React from 'react'
import './navbar.css'
import { assets } from '../../assets/assets'

export const Navbar = () => {
  return (
    <div className='navbar'>
        <img src={assets.logo} className='logo' />
        <img src={assets.profile_image} className='profile' />


    </div>
  )
}
