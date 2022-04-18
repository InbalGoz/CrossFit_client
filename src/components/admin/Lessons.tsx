import * as React from 'react';
import { styled } from '@mui/material/styles';
import {Box , TextField} from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Button } from '@mui/material';

function generate(element: React.ReactElement) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}
const types = ['Yoga', 'Pilates', 'Circuit Training'];
const lessonsTypes = types.map((lessontype,index) => (
            <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <FitnessCenterIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary= {lessontype}
                    //secondary={secondary ? 'Secondary text' : null}
                  />
            </ListItem>
      ))

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const handleAddClick = () =>{
  
}

const Lessons = () => {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  return (
    
    <Grid container spacing={20} sx={{display:'flex' , alignItems:'center', justifyContent:'center'}}>
      
    <Grid item xs={12} md={4} >
          <Typography sx={{ mt: 4, mb: 2 , fontFamily:'Nunito'}} variant="h5" component="div">
            Lessons types
          </Typography>
          
          <Button onClick={handleAddClick}>Add Lesson Type</Button>
         
          <Demo>
            <List dense={dense}>
               
             {lessonsTypes}
            </List>
          </Demo>
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography sx={{ mt: 4, mb: 2 , fontFamily:'Nunito'}} variant="h5" component="div">
            Lessons
          </Typography>
          <Button>Schedual a new Lesson</Button>
          <Demo>
            <List dense={dense}>
              {generate(
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <AssignmentIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Single-line item"
                    secondary={secondary ? 'Secondary text' : null}
                  />
                </ListItem>,
              )}
            </List>
          </Demo>
        </Grid>
        </Grid>
       
  )
}

export default Lessons