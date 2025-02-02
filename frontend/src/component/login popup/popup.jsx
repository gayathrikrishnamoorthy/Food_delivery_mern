import React, { useContext, useState } from 'react'
import './login.css'
import { assets } from '../../assets/assets'
import { Storecontext } from '../../context/storecontext'
import axios from 'axios'
export const Popup = ({setshow}) => {

    const{url,settoken,token}=useContext(Storecontext)
    const[crnt,setcrnt]=useState('Sign Up')
    const[data,setdata]=useState({
        name:"",
        email:"",
        password:""
    })

    const onchangehandler = (e)=>
    {
        const name=e.target.name;
        const value=e.target.value;
        setdata(data=>({...data,[name]:value}))

    }

    const onlogin =async(e)=>
    {
       e.preventDefault()
       let newurl=url;
       if(crnt==='Login')
       {
        newurl+='/api/user/login'
       }
       else{
         newurl+='/api/user/register'
       }


       const res= await axios.post(newurl,data);
       if(res.data.success)
       {
          settoken(res.data.token)
          localStorage.setItem("token",res.data.token)
          setshow(false)
       }
       else{
        alert(res.data.message)
       }
    }

  return (
    <div className='loginpopup'>
        <form onSubmit={onlogin} className='login-container'>
            <div className="login-title">
                <h2>{crnt}</h2>
                <img onClick={()=>setshow(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-input">
                {crnt==="Login"?<></>:<input name='name' onChange={onchangehandler} value={data.name} type="text"placeholder='Name' required />}
                
                <input type="email"  onChange={onchangehandler} name='email' value={data.email}  placeholder='Email' required />
                <input type="password" onChange={onchangehandler} name='password' value={data.password}  placeholder='Password' required />
            </div>
            <button type='submit'>{crnt==="Sign Up"?"Create account":"Login"}</button>
            <div className="login-condition">
                <input type="checkbox" required />
                <p>By continuing,I agree to the terms of use & privacy policy</p>
            </div>
            {crnt==="Login"?<p>Create a new account? <span onClick={()=>setcrnt("Sign Up")}>Click here</span></p>:
            <p>Already have an account?<span onClick={()=>setcrnt('Login')}>Login here</span></p>
            }
            
        
        </form>
    </div>
  )
}
