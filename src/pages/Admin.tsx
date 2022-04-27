import React, {useState} from 'react';
import {useParams} from 'react-router-dom'
import Header from '../components/Header';
import CustomerTable from '../components/admin/CustomerTable';
import Lessons from '../components/admin/Lessons';
import { useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
    const { adminActions } = useParams();

  const { id } = useParams();
  const [isAdmin , setAdmin] = useState(true);

  /*const getUser = async () =>{
    const { data } = await axios.get(`/users/${id}`);

    console.log("data",data);
  }*/


  useEffect(()=>{
        console.log("action" ,adminActions )
  })
  
  return (
    <>
      <Header isAdmin={isAdmin}/>
      <div>
          {(adminActions === 'customers' && <CustomerTable/>) ||
           (adminActions === 'lessons' && <Lessons/>)
          }
      </div>
    </>
  )
}

export default Admin