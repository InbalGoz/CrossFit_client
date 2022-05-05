import React, { useState, useEffect } from "react";
import { List, Grid, Typography, ListItem, ListItemText } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import IconButton from "@mui/material/IconButton";

//redux
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { createCustomerToLesson } from "../store/actions/customerToLessonActions";
import { createNotification } from "../store/actions/notificationActions";
import { lessonService } from "../services/lessonService";
import { Lesson } from "../models/lesson";

const RecommendedLessons: React.FC = () => {
  const [lessons, setLessons] = useState<Array<Object>>([]);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.customer);

  useEffect(() => {
    const recommendedLessonsService = async () => {
      const recommendedLessons: Lesson[] =
        await lessonService.getRecommendedLessons();
      setLessons(recommendedLessons);
    };
    recommendedLessonsService();
  }, []);

  const handleAddToLesson = (lesson_id: any, lesson_title: any) => {
    console.log("user.id recomended", user.id);
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
        primary={`${lesson.title} lesson with ${lesson.employeeFName} ${lesson.employeeLName}`}
        secondary={` Related categories : ${lesson.tags.map(
          (tag: any) => tag
        )} ,  Date : ${new Date(`${lesson.startDate}`)
          .toISOString()
          .slice(0, 10)} ,
        From:
        ${new Date(`${lesson.startDate}`).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })} to : ${new Date(`${lesson.endDate}`).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}`}
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
