import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Box, Modal, Button } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
//import AssignmentIcon from '@mui/icons-material/Assignment';
import LessonTypeForm from "./LessonTypeForm";
import LessonForm from "./LessonForm";
import EditIcon from "@mui/icons-material/Edit";

//redux
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  deleteLesson,
  getFullInfoLessons,
  createLesson,
  editLesson,
  getLesson,
} from "../../store/actions/lessonActions";
import {
  getAllLessonTypes,
  deleteLessonType,
  editLessonType,
} from "../../store/actions/lessonTypeActions";

import { lessonService } from "../../services/lessonService";
import { Lesson } from "../../models/lesson";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const style = {
  position: "absolute",
  top: "48%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Lessons: React.FC = () => {
  const dispatch = useAppDispatch();
  const [fullInfolessons, setFullInfolessons] = useState<Array<Object>>([]);
  const { all_lessonTypes } = useAppSelector((state) => state.lessonType);
  const { lesson } = useAppSelector((state) => state.lesson);

  const [dense, setDense] = React.useState(false);
  // const [secondary, setSecondary] = React.useState(false);

  const [openLessonType, setOpenLessonType] = useState(false);

  const lessonTypeFormClose = () => setOpenLessonType(false);
  const lessonTypeFormShow = () => setOpenLessonType(true);

  const [openLesson, setOpenLesson] = useState(false);
  const lessonFormClose = () => setOpenLesson(false);
  const lessonFormShow = () => setOpenLesson(true);

  const fullInfolessonsService = async () => {
    const newfullInfolessons: Lesson[] =
      await lessonService.getFullInfoLessons();

    console.log("after get full lessons", newfullInfolessons);
    setFullInfolessons(newfullInfolessons);
  };

  useEffect(() => {
    fullInfolessonsService();

    dispatch(getAllLessonTypes());
  }, []);

  const handleAddLessonType = () => {
    setOpenLessonType(true);
  };

  const handleAddIconLesson = () => {
    setOpenLesson(true);
  };

  const renderLessons = fullInfolessons.map((lesson: any, index) => (
    <>
      <ListItem
        key={index}
        secondaryAction={
          <IconButton
            edge='end'
            aria-label='delete'
            onClick={() => handleDelteLesson(lesson.id)}
          >
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
          primary={`${lesson.title} lesson with ${lesson.employeeFName} ${lesson.employeeLName}`}
          secondary={` Related categories : ${lesson.tags.map(
            (tag: any) => tag
          )} ,  Date : ${new Date(`${lesson.startDate}`)
            .toISOString()
            .slice(0, 10)} ,
          From: ${new Date(`${lesson.startDate}`).toLocaleTimeString("en", {
            timeStyle: "short",
            hour12: false,
            timeZone: "UTC",
          })} to ${new Date(`${lesson.endDate}`).toLocaleTimeString("en", {
            timeStyle: "short",
            hour12: false,
            timeZone: "UTC",
          })}
          `}
          //secondary={secondary ? 'Secondary text' : null}
        />

        <IconButton onClick={() => handleEditLesson(lesson.id)}>
          <EditIcon />
        </IconButton>
      </ListItem>
    </>
  ));

  const handleSubmitLesson = () => {
    fullInfolessonsService();
  };

  const handleDelteLesson = async (lesson_id: any) => {
    const newFullInfoLessons = fullInfolessons.filter(
      (lesson_item: any) => lesson_item.id !== lesson_id
    );

    setFullInfolessons(newFullInfoLessons);

    dispatch(deleteLesson(lesson_id));
  };

  const handleEditLesson = async (lesson_id: any) => {
    dispatch(getLesson(lesson_id));

    console.log("lesson gett", lesson);
  };

  const lessonsTypes = all_lessonTypes.map((lessontype, index) => (
    <ListItem
      key={index}
      secondaryAction={
        <IconButton
          edge='end'
          aria-label='delete'
          onClick={() => handleDeleteLessonType(lessontype.id)}
        >
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
        primary={lessontype.title}
        secondary={lessontype.level}
        //secondary={secondary ? 'Secondary text' : null}
      />
      <IconButton>
        <EditIcon />
      </IconButton>
    </ListItem>
  ));

  const handleDeleteLessonType = (lessontype_id: any) => {
    dispatch(deleteLessonType(lessontype_id));
  };

  /*const handleEditLessonType = (lessontype_id:any, formData:any) =>{
  dispatch(editLessonType(lessontype_id))
  };*/

  return (
    <>
      <Grid
        container
        spacing={20}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Grid item xs={12} md={5}>
          <Typography
            sx={{ mt: 6, mb: 2, fontFamily: "Nunito" }}
            variant='h5'
            component='div'
          >
            Lessons types
          </Typography>

          <Button variant='contained' onClick={handleAddLessonType}>
            Add Lesson Type
          </Button>

          <Demo>
            <List dense={dense}>{lessonsTypes}</List>
          </Demo>
        </Grid>

        <Grid item xs={12} md={5}>
          <Typography
            sx={{ mt: 6, mb: 2, fontFamily: "Nunito" }}
            variant='h5'
            component='div'
          >
            Lessons
          </Typography>
          <Button variant='contained' onClick={handleAddIconLesson}>
            Schedual a new Lesson
          </Button>
          <Demo>
            <List dense={dense}>{renderLessons}</List>
          </Demo>
        </Grid>
      </Grid>

      <Modal
        open={openLessonType}
        onClose={lessonTypeFormClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <LessonTypeForm />

          <Button onClick={lessonTypeFormClose}>Close</Button>
        </Box>
      </Modal>

      <Modal
        open={openLesson}
        onClose={lessonFormClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <LessonForm handleSubmitLesson={handleSubmitLesson} />

          <Button onClick={lessonFormClose}>Close</Button>
        </Box>
      </Modal>
    </>
  );
};

export default Lessons;

/*
<IconButton>
          <ForwardToInboxIcon />
        </IconButton>*/

/*
${new Date(`${lesson.startDate}`).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })} to : ${new Date(`${lesson.endDate}`).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}*/
