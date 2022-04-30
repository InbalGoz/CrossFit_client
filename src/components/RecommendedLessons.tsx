import React, { useState, useEffect } from "react";
import { List, Grid, Typography, ListItem, ListItemText } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import IconButton from "@mui/material/IconButton";
import { useParams } from "react-router-dom";

//redux
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getAllLessons } from "../store/actions/lessonActions";
import { getAllLessonTypes } from "../store/actions/lessonTypeActions";
import { createCustomerToLesson } from "../store/actions/customerToLessonActions";
import { createNotification } from "../store/actions/notificationActions";

const RecommendedLessons: React.FC = () => {
  const { id } = useParams(); ///bytoken

  const [lessons, setLessons] = useState<Array<Object>>([]);

  const dispatch = useAppDispatch();
  const all_lessons = useAppSelector((state) => state.lesson.all_lessons);
  const { all_lessonTypes, lessonType } = useAppSelector(
    (state) => state.lessonType
  );
  //const { customerToLesson } = useAppSelector(state => state.customerToLesson);

  useEffect(() => {
    dispatch(getAllLessons());
    dispatch(getAllLessonTypes());
    // recommendedLessons();
  }, [dispatch]); //all_lessons , id , dispatchall_lessons, lessonType

  const handleAddToLesson = (
    lesson_id: any,
    customer_id: any,
    lesson_title: any
  ) => {
    //need the customerId and lesson Id
    const data = {
      lessonId: lesson_id,
      customerId: customer_id,
    };

    dispatch(createCustomerToLesson(data));

    const registerNotification = {
      title: "lesson_title",
      desc: `You are now registerd to 2 lesson.`,
      isRead: false,
      createdAt: new Date().toLocaleString(),
      customerId: id,
    };

    //send notification to db and get it back from db
    dispatch(createNotification(registerNotification));
  };

  // const lessonsListItems = lessons.map((le:any)=> (
  const lessonsListItems = all_lessons.map((lesson: any, index: any) => (
    <ListItem
      key={index}
      disableGutters
      secondaryAction={
        <IconButton
          aria-label='comment'
          onClick={() => handleAddToLesson(lesson.id, id, "title")}
        >
          <AddCircleIcon />
        </IconButton>
      }
    >
      <ListItemText
        primary={`${lesson.title}`}
        secondary={`${lesson.startDate} until ${lesson.endDate}`}
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
    </>
  );
};

export default RecommendedLessons;

/*
const recommendedLessons = () => {
      console.log("recommende");
      let recommendedLesson = {
        title: "",
        startDate: null as any,
        endDate: null as any,
      };
      let recommendedLessonsArray: any[] = [];

      console.log("all", all_lessons);

      all_lessons.forEach((lesson) => {
        //dispatch(getLessonType(lesson.lessonTypeId));
        all_lessonTypes.forEach((lessonType) => {
          if (lessonType.id === lesson.lessonTypeId) {
            console.log("lessonType.title", lessonType.title);
            recommendedLesson.title = lessonType.title;
          }
        });

        console.log("lesson.date", lesson.startDate?.toString());
        // const startDate = lesson.startDate?.toUTCString();

        recommendedLesson.startDate = lesson.startDate;
        recommendedLesson.endDate = lesson.endDate;

        recommendedLessonsArray.push(recommendedLesson);
      });
      setLessons(recommendedLessonsArray);
    };*/
