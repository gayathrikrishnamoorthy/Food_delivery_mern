import React, { useEffect, useState } from 'react'
import './list.css'
import axios from 'axios';
import { toast } from 'react-toastify';

export const List = ({url}) => {

    const[list,setlist]=useState([]);
   
    const fetchlist = async()=>
    {
        const response=await axios.get(`${url}/api/food/list`)
        
        
        if(response.data.success)
        {
            setlist(response.data.data)
        }
        else{
            toast.error("Error")
        }
    }

    const removefood= async(id)=>
    {
        const res= await axios.post(`${url}/api/food/remove`,{id:id});
        await fetchlist();
        if(res.data.success)
        {
            toast.success(res.data.message);
        }
        else{
            toast.error("Error");
        }


    }
    useEffect(()=>{

        fetchlist();
    },[])
  return (
    <div className='list add flex-col'>
        <p>All Foods List</p>
        <div className="list-table">
            <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
            </div>
            {list.map((item,i)=>
            {
                return (
                    <div key={i} className='list-table-format'>
                            <img src={`${url}/images/`+item.image} alt="" />
                            <p>{item.name}</p>
                            <p>{item.category}</p>
                            <p>$ {item.price}</p>
                            <p onClick={()=>removefood(item._id)} className='cursor'> X</p>
                    </div>
                )
            })}
        </div>

    </div>
  )
}
