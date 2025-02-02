import React, { useState } from 'react'
import './home.css'
import { Header } from '../../component/header/Header'
import { Exploremenu } from '../../component/explore menu/exploremenu'
import Fooddisplay from '../../component/Fooddisplay/Fooddisplay'
import { Appdownload } from '../../component/app-download/app-download'

export const Home = () => {

  const[category,setcategory] =useState("All")
  return (
    <div>
        <Header/>
        <Exploremenu category={category} setcategory={setcategory}/>
        <Fooddisplay category={category}/>
        <Appdownload/>
      
    </div>
  )
}
