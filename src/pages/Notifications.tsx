import { Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NotificationCard from "../components/NotificationCard";
import Header from "../components/Header";

//redux
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  getNotification,
  deleteNotification,
  getNotificationsByCustomerId,
  editAllNotification,
} from "../store/actions/notificationActions";

const Notifications = () => {
  const dispatch = useAppDispatch();
  const [isAdmin, setAdmin] = useState(true);
  const { user } = useAppSelector((state) => state.customer);
  const { all_notificationsById } = useAppSelector(
    (state) => state.notification
  );

  useEffect(() => {
    console.log(user.id);
    dispatch(getNotificationsByCustomerId(user.id));
    dispatch(editAllNotification(user.id));

    console.log("all_notifications", all_notificationsById);
  }, []);

  const notificationsCards = all_notificationsById.map(
    (notification: any, index) => (
      <NotificationCard
        key={index}
        title={notification.title}
        desc={notification.desc}
        handleDelete={() => handleDelete(notification.id)}
      />
    )
  );

  const handleDelete = (notification_id: number) => {
    dispatch(deleteNotification(notification_id));
    console.log("notification_id", notification_id);
  };

  const root: Object = {
    marginTop: 30,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  return (
    <>
      <Header isAdmin={isAdmin} />
      <Box style={root}>
        <Typography component='h1' variant='h3' sx={{ fontFamily: "Nunito" }}>
          Inbox
        </Typography>
        {notificationsCards}
      </Box>
    </>
  );
};

export default Notifications;
