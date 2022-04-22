import { Box, Typography } from '@mui/material';
import React , {useState , useEffect} from 'react';
import {useParams} from 'react-router-dom'
import NotificationCard from '../components/NotificationCard';
import Header from '../components/Header';
import axios from 'axios';

const Notifications = () => {

  const { id } = useParams();
  const [isAdmin , setAdmin] = useState(true);

  const getUser = async () =>{
    const { data } = await axios.get(`/api/users/${id}`);

    console.log("data",data);
  }

  useEffect(()=>{
    getUser();
  })

  const root: Object = {
        marginTop: 30,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
  }

  return (
    <>
     <Header isAdmin={isAdmin}/> 
    <Box style={root}>
        <Typography component="h1" variant="h3" sx={{fontFamily:'Nunito'}}>
            Inbox
        </Typography>
        <NotificationCard/>
    </Box>
    </>  
  )
}

export default Notifications;