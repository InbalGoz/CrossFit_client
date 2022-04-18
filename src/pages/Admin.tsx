import React, {} from 'react';
import {useParams} from 'react-router-dom'
import Header from '../components/Header';
import CustomerTable from '../components/CustomerTable';
import Classes from '../components/Classes';
import { useEffect } from 'react';

const Admin = () => {
    const { adminActions } = useParams();

    useEffect(()=>{
        console.log("action" ,adminActions )
    })
  return (
    <>
      <Header/>
      <div>
          {(adminActions === 'customers' && <CustomerTable/>) ||
           (adminActions === 'classes' && <Classes/>)
          }
      </div>
    </>
  )
}

export default Admin