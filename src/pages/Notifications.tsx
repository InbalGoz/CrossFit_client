import { Box, Typography } from '@mui/material';
import React , {useState , useEffect} from 'react';
import {useParams} from 'react-router-dom'
import NotificationCard from '../components/NotificationCard';
import Header from '../components/Header';


//redux
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getAllNotificationsById , getNotification , deleteNotification} from '../store/actions/notificationActions';


const Notifications = () => {

  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [isAdmin , setAdmin] = useState(true);
  const all_notifications = useAppSelector(state => state.notification.all_notifications);

  //chack
  const notiArray = [{
    id: 1,
    title: "Hello , good morning",
    desc: "string",
    isRead: false,
    createdAt: null,
  }]

  ///get it back
 /* const handleDelete = (notification_id:number) => {
    dispatch(deleteNotification(notification_id));// delete and renders again without the same noti
  };

  const notificationsCards = all_notifications.map((notification:any)=> (
  <NotificationCard title={notification.title} desc={notification.desc}/> 
 ))*/

 const handleDelete = (notification_id:number) => {
  console.log("notification_id" , notification_id);
 };

 useEffect(()=>{
  // dispatch(getAllNotificationsById()); // change to get by id
   console.log("all_notifications" , all_notifications)
 },[all_notifications , dispatch])

 const notificationsCards = notiArray.map((notification:any , index)=> (
  <NotificationCard key={index} title={notification.title} desc={notification.desc} handleDelete={() => handleDelete(notification.id)}/> 
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