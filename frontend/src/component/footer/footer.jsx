import React from 'react'
import './footer.css'
import { assets } from '../../assets/assets'

export const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-left">
<img src={assets.logo} alt="" />
<p>lorem ipsum is simply udmmy tect of the printing anf typescriotiun.Hre you all aboutu us .</p>
<div className="footer-social-icons">
    <img src={assets.facebook_icon} alt="" />
    <img src={assets.twitter_icon} alt="" />
    <img src={assets.linkedin_icon} alt="" />
</div>
            </div>
            <div className="footer-center">
            <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div className="footer-right">
               <h2>GET IN TOUCH</h2>
               <ul>
                <li>+91 9345287191</li>
                <li>conatact@tomato.com</li>
               </ul>
            </div>
        </div>
        <hr />
        <p className="copyright">Copyright 2024 @Tomato.com -All Right Reserved</p>
    </div>
  )
}

