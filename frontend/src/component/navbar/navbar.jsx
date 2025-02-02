
import React, { useContext, useEffect, useState } from 'react'
import './navbar.css'
import { assets } from '../../assets/assets.js'
import {Link, useNavigate } from 'react-router-dom'
import { Storecontext } from '../../context/storecontext.jsx'

export const Navbar = ({setshow}) => {


  const[menu,setmenu]=useState("home")
  const{gettotalcart,settoken,token,setcartitems}=useContext(Storecontext)
  const navigate=useNavigate();
  const logout =()=>
  {

    localStorage.removeItem("token")
    settoken("");
    navigate('/');
   
    
    

  }
  return (
    <div className='navbar'>
    <Link to='/'> <img src={assets.logo} alt="" className='logo'/></Link>   
        <ul className="navbar-menu">
          <Link to='/' onClick={()=>setmenu("home")}  className={menu==="home"?'active':''}>Home</Link>
          <a href='#explore-menu' onClick={()=>setmenu("menu")} className={menu==="menu"?'active':''}>Menu</a>
          <a  href='#app-download' onClick={()=>setmenu("mobile-app")}  className={menu==="mobile-app"?'active':''}>Mobile-app</a>
          <a href='#footer' onClick={()=>setmenu("contact-us")} className={menu==="contact-us"?'active':''}>Contact us</a>
        </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
         <Link to='/cart' ><img src={assets.basket_icon} alt="" /></Link>
          <div className={gettotalcart()===0?"":"dot"}></div>
         
        </div>
        {!token? <button onClick={()=>setshow(true)}>Sign in</button> :
        <div className='navbar-profile'>
          <img src={assets.profile_icon} alt="" />
          <ul className="nav-dropdown">
            <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" />
            <p>Orders</p></li>
            <hr />
            <li onClick={logout}><img src={assets.logout_icon} alt="" />
          <p>Logout</p>

            </li>
          </ul>

          </div>
        }
         
      </div>
    </div>
  )
}
