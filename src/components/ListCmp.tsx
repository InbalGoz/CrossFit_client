import React from "react";
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
import EditIcon from "@mui/icons-material/Edit";

//redux
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  getFullInfoLessons,
  deleteLesson,
} from "../store/actions/lessonActions";
import { useEffect } from "react";

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

function generate(element: React.ReactElement) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

const ListCmp = () => {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  const dispatch = useAppDispatch();

  const { all_fullInfoLessons } = useAppSelector((state) => state.lesson);

  useEffect(() => {
    dispatch(getFullInfoLessons());
  }, []);

  const renderLessons = all_fullInfoLessons.map((lesson: any, index) => (
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

        <IconButton>
          <EditIcon />
        </IconButton>
      </ListItem>
    </>
  ));

  const handleDelteLesson = async (lesson_id: any) => {
    dispatch(deleteLesson(lesson_id));
  };

  return (
    <Grid item xs={12} md={5}>
      <Typography sx={{ mt: 4, mb: 2 }} variant='h6' component='div'>
        Avatar with text and icon
      </Typography>
      <Demo>
        <List dense={dense}>{renderLessons}</List>
      </Demo>
    </Grid>
  );
};

export default ListCmp;
