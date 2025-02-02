import React from 'react'
import './appdownload.css'
import { assets } from '../../assets/assets'
export const Appdownload = () => {
  return (
    <div className='app-download' id='app-download'>
<p>For Better Experience Download <br/>Tomato App</p>
<div className="download">
    <img src={assets.play_store} alt="" />
    <img src={assets.app_store} alt="" />
</div>
    </div>
  )
}
