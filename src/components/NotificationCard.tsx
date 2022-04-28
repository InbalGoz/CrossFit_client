import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { deleteNotification} from '../store/actions/notificationActions';

interface Props{
  title:any,
  desc:any,
  handleDelete:any,
}


const NotificationCard: React.FC<Props> = ({title , desc , handleDelete}) => {

  

  return (
    <Card sx={{ minWidth: 800 }}>
    <CardContent>
      <Typography variant="h5" component="div">
        {title}
      </Typography>

      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        
      </Typography>

      <Typography variant="body2">
        {desc}
      </Typography>

    </CardContent>
    <CardActions>
      <Button size="small" onClick={handleDelete}>Delete</Button>
    </CardActions>
  </Card>
  )
}

export default NotificationCard;