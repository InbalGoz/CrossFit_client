import { Box, Typography } from '@mui/material';
import React from 'react';
import NotificationCard from '../components/NotificationCard';
import Header from '../components/Header';

const Notifications = () => {

  const root: Object = {
        marginTop: 30,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
  }

  return (
    <>
     <Header/> 
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