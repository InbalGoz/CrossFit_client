import * as React from 'react';
import { List, Grid , Typography , ListItem , ListItemText } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';

const RecommendedLessons: React.FC = () => {
  return (
  <>
    <Grid container spacing={0} sx={{ marginTop:5 ,display:'flex' , alignItems:'center', justifyContent:'center'}}>  
    <Grid item xs={12} md={5}>
       <Typography sx={{ mt: 6, mb: 2 , fontFamily:'Nunito'}} variant="h5" component="div">
            Recommended Lessons
        </Typography>
    <List sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>
      {[1, 2, 3].map((value) => (
        <ListItem
          key={value}
          disableGutters
          secondaryAction={
            <IconButton aria-label="comment">
              <CommentIcon />
            </IconButton>
          }
        >
          <ListItemText primary={`Line item ${value}`} />
        </ListItem>
      ))}
    </List>
    </Grid>
    </Grid>
    </>
  );
}

export default RecommendedLessons;