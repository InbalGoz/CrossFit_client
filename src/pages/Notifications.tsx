import { Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NotificationCard from "../components/NotificationCard";
import Header from "../components/Header";

//redux
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  deleteNotification,
  getNotificationsByCustomerId,
  editAllNotification,
} from "../store/actions/notificationActions";

const Notifications: React.FC = () => {
  const [isAdmin, setAdmin] = useState(true);

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { all_notificationsById } = useAppSelector(
    (state) => state.notification
  );

  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      dispatch(editAllNotification(user.id));
    } else {
      navigate("/");
    }
  }, []);

  const notificationsCards = all_notificationsById.map(
    (notification: any, index) => (
      <NotificationCard
        key={index}
        title={notification.title}
        desc={notification.desc}
        date={notification.createdAt}
        handleDelete={() => handleDelete(notification.id)}
      />
    )
  );

  const handleDelete = (notification_id: number) => {
    dispatch(deleteNotification(notification_id));
  };

  const root: Object = {
    marginTop: 30,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  return (
    <>
      <Header />
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
