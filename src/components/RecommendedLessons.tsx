import * as React from 'react';
import { List, Grid , Typography , ListItem , ListItemText } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';

import { Lesson } from '../models/lesson';

//redux
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getAllLessons } from '../store/actions/lessonActions';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const RecommendedLessons: React.FC = () => {
  const {id} = useParams();
  //const [lessons , setLessons] = useState<Array<Lesson>>([]);
  const dispatch = useAppDispatch();
  const all_lessons = useAppSelector(state => state.lesson.all_lessons);

  

  useEffect(()=>{
    dispatch(getAllLessons());

    console.log("all_lessons" , all_lessons)

   // const fetchlessons = () =>{
     // const new_all_lessons: any = all_lessons.filter(
       // // ( lesson ) => !lesson.coustomers?.includes(id)
        // );
       // setLessons(new_all_lessons) ;
       //setLessons(all_lessons) ;
     //};

   // fetchlessons();
  },[])//all_lessons , id , dispatch

 
 // const lessonsListItems = lessons.map((le:any)=> (
  const lessonsListItems = all_lessons.map((le:any)=> (
      <ListItem
          key={le.lessonTypeId}
          disableGutters
          secondaryAction={
            <IconButton aria-label="comment">
              <CommentIcon />
            </IconButton>
          }
        >
          <ListItemText primary={`${le.lessonTypeId}`} />
      </ListItem>
  ))

  return (
  <>
    <Grid container spacing={0} sx={{ marginTop:5 ,display:'flex' , alignItems:'center', justifyContent:'center'}}>  
    <Grid item xs={12} md={5}>
       <Typography sx={{ mt: 6, mb: 2 , fontFamily:'Nunito'}} variant="h5" component="div">
            Recommended Lessons
        </Typography>
    <List sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>
      {lessonsListItems}
    </List>
    </Grid>
    </Grid>
    </>
  );
}

export default RecommendedLessons;