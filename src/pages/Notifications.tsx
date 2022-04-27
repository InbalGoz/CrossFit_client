import { Box, Typography } from '@mui/material';
import React , {useState , useEffect} from 'react';
import {useParams} from 'react-router-dom'
import NotificationCard from '../components/NotificationCard';
import Header from '../components/Header';


//redux
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getAllNotificationsById } from '../store/actions/notificationActions';


const Notifications = () => {

  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [isAdmin , setAdmin] = useState(true);
  const all_notifications = useAppSelector(state => state.notification.all_notifications);


 useEffect(()=>{
   dispatch(getAllNotificationsById());
 })

 const notificationsCards = all_notifications.map((notification:any)=> (
  <NotificationCard/> 
 ))


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
        {notificationsCards}
    </Box>
    </>  
  )
}

export default Notifications;