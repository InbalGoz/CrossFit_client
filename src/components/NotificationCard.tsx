import React from "react";
import { Card, CardHeader } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { deleteNotification } from "../store/actions/notificationActions";

interface Props {
  title: any;
  desc: any;
  date: any;
  handleDelete: any;
}

const NotificationCard: React.FC<Props> = ({
  title,
  desc,
  date,
  handleDelete,
}) => {
  return (
    <Card sx={{ minWidth: 800, mb: 5 }}>
      <CardHeader
        title={title}
        subheader={`Date : ${new Date(`${date}`).toISOString().slice(0, 10)} ,
      At:
      ${new Date(`${date}`).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })}`}
      />
      <CardContent>
        <Typography variant='body2' fontSize={20}>
          {desc}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small' onClick={handleDelete}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default NotificationCard;
