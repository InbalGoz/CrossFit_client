import React, { useState, useEffect } from "react";
import {
  List,
  Grid,
  Typography,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import IconButton from "@mui/material/IconButton";
import { useParams } from "react-router-dom";

//redux
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getAllLessons } from "../store/actions/lessonActions";
import { getAllLessonTypes } from "../store/actions/lessonTypeActions";
import { createCustomerToLesson } from "../store/actions/customerToLessonActions";
import { createNotification } from "../store/actions/notificationActions";
import { lessonService } from "../services/lessonService";

const RecommendedLessons: React.FC = () => {
  const [lessons, setLessons] = useState<Array<Object>>([]);

  const dispatch = useAppDispatch();
  const all_lessons = useAppSelector((state) => state.lesson.all_lessons); // get from backend in useEffevct
  const { all_lessonTypes, lessonType } = useAppSelector(
    (state) => state.lessonType
  );
  const { user } = useAppSelector((state) => state.customer);

  const recommendedLessons = () => {
    let recommendedLesson = {
      id: undefined as any,
      title: "",
      startDate: null as any,
      endDate: null as any,
    };

    let recommendedLessonsArray: any[] = [];
    console.log("length", all_lessons.length);
    all_lessons.forEach((lesson) => {
      all_lessonTypes.forEach((lessonType) => {
        if (lessonType.id === lesson.lessonTypeId) {
          recommendedLesson.title = lessonType.title;
        }
      });

      console.log("lesson.date", new Date(`${lesson.startDate}`));

      recommendedLesson.id = lesson.id;
      recommendedLesson.startDate = new Date(`${lesson.startDate}`);
      recommendedLesson.endDate = new Date(`${lesson.endDate}`);

      recommendedLessonsArray.push(recommendedLesson);
    });
    setLessons(recommendedLessonsArray);
  };

  useEffect(() => {
    dispatch(getAllLessons());
    dispatch(getAllLessonTypes());
    recommendedLessons();
  }, []); //all_lessons , id , dispatchall_lessons, lessonType

  const handleAddToLesson = (lesson_id: any, lesson_title: any) => {
    const data = {
      lessonId: lesson_id,
      customerId: user.id,
    };

    dispatch(createCustomerToLesson(data));

    const registerNotification = {
      title: lesson_title,
      desc: `You are now registerd to ${lesson_title} lesson.`,
      isRead: false,
      createdAt: new Date().toLocaleString(),
      customerId: user.id,
    };

    //send notification to db and get it back from db
    dispatch(createNotification(registerNotification));
  };

  // const lessonsListItems = lessons.map((le:any)=> (
  const lessonsListItems = lessons.map((lesson: any, index: any) => (
    <ListItem
      key={index}
      disableGutters
      secondaryAction={
        <IconButton
          aria-label='comment'
          onClick={() => handleAddToLesson(lesson.id, lesson.title)}
        >
          <AddCircleIcon />
        </IconButton>
      }
    >
      <ListItemText
        primary={`${lesson.title}`}
        secondary={` from : ${new Date(
          `${lesson.startDate}`
        ).toLocaleString()}, until : ${new Date(
          `${lesson.endDate}`
        ).toLocaleString()}`}
      />
    </ListItem>
  ));

  return (
    <>
      <Grid
        container
        spacing={0}
        sx={{
          marginTop: 5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid item xs={12} md={5}>
          <Typography
            sx={{ mt: 6, mb: 2, fontFamily: "Nunito" }}
            variant='h5'
            component='div'
          >
            Recommended Lessons
          </Typography>
          <List
            sx={{ width: "100%", maxWidth: 600, bgcolor: "background.paper" }}
          >
            {lessonsListItems}
          </List>
        </Grid>
      </Grid>
      <Button
        onClick={() => {
          const registerNotification = {
            title: "lesson_title",
            desc: `You are now registerd to 2 lesson.`,
            isRead: false,
            createdAt: new Date().toLocaleString(),
            customerId: user.id,
          };

          //send notification to db and get it back from db
          dispatch(createNotification(registerNotification));
        }}
      >
        test add notification
      </Button>
    </>
  );
};

export default RecommendedLessons;
