import { Button } from '@mui/material';
import axios from 'axios';
import React , { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import RecommendedLessons from '../components/RecommendedLessons';

const Home = () => {

  const { id } = useParams();
  const [isAdmin , setAdmin] = useState(true);

 
  /*const handleDelete = async () =>{
     const res:any = await axios.delete(`https://my-crossfit-app.herokuapp.com/customers/${id}`);
  }*/

  return (
    <div>
      <Header isAdmin={isAdmin}/>
      <RecommendedLessons/>
    </div>
  )
}

export default Home;