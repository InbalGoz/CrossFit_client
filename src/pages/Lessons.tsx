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
import LessonTypeForm from "../components/admin/LessonTypeForm";
import LessonForm from "../components/admin/LessonForm";
import EditIcon from "@mui/icons-material/Edit";

//redux
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  deleteLesson,
  getFullInfoLessons,
} from "../store/actions/lessonActions";
import {
  getAllLessonTypes,
  deleteLessonType,
} from "../store/actions/lessonTypeActions";
import { FullLesson, Lesson } from "../models/lesson";
import { LessonType } from "../models/lessonType";

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
  const { all_lessonTypes } = useAppSelector((state) => state.lessonType);
  const { all_fullInfoLessons } = useAppSelector((state) => state.lesson);
  const dense = false;
  const [openLessonType, setOpenLessonType] = useState(false);
  const [openLesson, setOpenLesson] = useState(false);
  const [choosenLessonType, setChoosenLessonType] = useState<LessonType | null>(
    null
  );
  const [choosenLesson, setChoosenLesson] = useState<FullLesson | null>(null);

  useEffect(() => {
    dispatch(getFullInfoLessons());
    dispatch(getAllLessonTypes());
  }, []);

  const renderLessons = all_fullInfoLessons.map((lesson: any, index) => (
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
        )} ,
           Number of participants: ${
             (lesson.customerIds && lesson.customerIds.length) || 0
           }  ,
          Date : ${new Date(`${lesson.startDate}`).toISOString().slice(0, 10)} ,
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
      />
      <IconButton onClick={() => handleEditLesson(lesson)}>
        <EditIcon />
      </IconButton>
    </ListItem>
  ));

  const handleDelteLesson = async (lesson_id: any) => {
    dispatch(deleteLesson(lesson_id));
  };

  const handleEditLesson = async (lesson: FullLesson) => {
    setChoosenLesson(lesson);
    setOpenLesson(true);
  };

  const handleEditLessonType = (lessonType: LessonType) => {
    setChoosenLessonType(lessonType);
    setOpenLessonType(true);
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
      <ListItemText primary={lessontype.title} secondary={lessontype.level} />
      <IconButton onClick={() => handleEditLessonType(lessontype)}>
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

  const reset = () => {
    setOpenLesson(false);
    setOpenLessonType(false);
    setChoosenLesson(null);
    setChoosenLessonType(null);
  };

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

          <Button variant='contained' onClick={() => setOpenLessonType(true)}>
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
          <Button variant='contained' onClick={() => setOpenLesson(true)}>
            Schedual a new Lesson
          </Button>
          <Demo>
            <List dense={dense}>{renderLessons}</List>
          </Demo>
        </Grid>
      </Grid>

      <Modal
        open={openLessonType}
        onClose={() => reset()}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <LessonTypeForm
            close={() => reset()}
            lessonType={choosenLessonType}
          />

          <Button onClick={() => reset()}>Close</Button>
        </Box>
      </Modal>

      <Modal
        open={openLesson}
        onClose={() => reset()}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <LessonForm lesson={choosenLesson} close={() => reset()} />

          <Button onClick={() => reset()}>Close</Button>
        </Box>
      </Modal>
    </>
  );
};

export default Lessons;
