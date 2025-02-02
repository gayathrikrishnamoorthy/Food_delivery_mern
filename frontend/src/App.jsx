import React, { useState } from 'react'
import { Navbar } from './component/navbar/navbar'
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/home/Home';
import { Cart } from './pages/cart/Cart';
import Placeorder from './pages/placeorder/placeorder';
import { Footer } from './component/footer/footer';
import { Popup } from './component/login popup/popup';
import { Verify } from './pages/verify/verify';
import { Myorders } from './pages/myorders/Myorders';


export const App = () => {

  const[show,setshow]=useState(false)

  
  return (
    <>
    {show?<Popup setshow={setshow}/>:<></>}
     <div className='app'>
<Navbar setshow={setshow}/>
<Routes>

<Route path='/' element={<Home/>} />
  <Route path='/cart' element={<Cart/>} />
  <Route path='/order' element={<Placeorder/>} />
  <Route path='/verify' element={<Verify/>} />
  <Route path='/myorders' element={<Myorders/>} />
</Routes>
 
    </div>
    <Footer/>
    </>
   
  )
}

export default App;