import * as React from 'react';
import { List, Grid , Typography , ListItem , ListItemText } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';

import { Lesson } from '../models/lesson';

//redux
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getAllLessons } from '../store/actions/lessonActions';
import { getLessonType , getAllLessonTypes } from '../store/actions/lessonTypeActions';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const RecommendedLessons: React.FC = () => {
  const {id} = useParams();

  const [lessons , setLessons] = useState<Array<Object>>([]);

  const dispatch = useAppDispatch();
  const all_lessons = useAppSelector(state => state.lesson.all_lessons);
  const { all_lessonTypes , lessonType } = useAppSelector(state => state.lessonType);
  

  useEffect(()=>{
    dispatch(getAllLessons());

    dispatch(getAllLessonTypes());
    recommendedLessons();

    console.log("all_lessons" , all_lessons)

   // const fetchlessons = () =>{
     // const new_all_lessons: any = all_lessons.filter(
       // // ( lesson ) => !lesson.coustomers?.includes(id)
        // );
       // setLessons(new_all_lessons) ;
       //setLessons(all_lessons) ;
     //};

   // fetchlessons();
  },[all_lessons])//all_lessons , id , dispatchall_lessons, lessonType

  const recommendedLessons = () =>{
    let recommendedLesson = {title:'', startDate: null as any  , endDate : null as any};
    let recommendedLessonsArray: any[] = [];
    
    all_lessons.forEach((lesson) => {

      //dispatch(getLessonType(lesson.lessonTypeId));
      all_lessonTypes.forEach((lessonType) => {
         if(lessonType.id === lesson.lessonTypeId){

          console.log("lessonType.title", lessonType.title)
          recommendedLesson.title = lessonType.title;
         }
      })

      console.log("lesson.date", lesson.startDate?.toString())
     // const startDate = lesson.startDate?.toUTCString();

      recommendedLesson.startDate = lesson.startDate;
      recommendedLesson.endDate = lesson.endDate;

      recommendedLessonsArray.push(recommendedLesson)

    })
    setLessons(recommendedLessonsArray);
  }

 
 // const lessonsListItems = lessons.map((le:any)=> (
  const lessonsListItems = lessons.map((lesson:any, index:any)=> (
      <ListItem
          key={index}
          disableGutters
          secondaryAction={
            <IconButton aria-label="comment">
              <AddCircleIcon />
            </IconButton>
          }
        >
          <ListItemText primary={`${lesson.title}`} secondary={`${lesson.startDate} until ${lesson.endDate}`} />
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