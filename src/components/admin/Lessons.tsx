import React , { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box , Modal , Button} from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
//import AssignmentIcon from '@mui/icons-material/Assignment';
import LessonTypeForm from './LessonTypeForm';
import LessonForm from './LessonForm';
import EditIcon from '@mui/icons-material/Edit';

//redux
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getAllLessons , deleteLesson} from '../../store/actions/lessonActions';
import { useEffect } from 'react';

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
                secondary={"level = entry level"}
                    //secondary={secondary ? 'Secondary text' : null}
              />
        <IconButton >
          <EditIcon />
       </IconButton>      
      </ListItem>
));




const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));


const style = {
  position: 'absolute',
  top: '48%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
 
};

const Lessons: React.FC = () => {

  const dispatch = useAppDispatch();
  const allLessons = useAppSelector(state => state.lesson.all_lessons);
 // const {lesson} = useAppSelector(state => state.lesson);

  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  const [openLessonType, setOpenLessonType] = useState(false);
 
  const lessonTypeFormClose = () => setOpenLessonType(false);
  const lessonTypeFormShow = () => setOpenLessonType(true);

  const [openLesson, setOpenLesson] = useState(false);
  const lessonFormClose = () => setOpenLesson(false);
  const lessonFormShow = () => setOpenLesson(true);

  useEffect(() => {
    dispatch(getAllLessons());
    console.log("allLessons", allLessons)
  },[])

  //lesson_id -> number
  const handleDelteLesson = (lesson_id:number|undefined) =>{
    allLessons.forEach((lesson) => {
      if(lesson.id === lesson_id){
        console.log('id',lesson.id)
        dispatch(deleteLesson(lesson_id))
      }
    })
    
  }
  
 const renderLessons = allLessons.map((lesson,index) => (
  <>
  <ListItem
       
       secondaryAction={
      <IconButton edge="end" aria-label="delete" onClick={()=>handleDelteLesson(lesson.id)}>
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
            primary= {lesson.lessonTypeId}
            secondary={`${lesson.date} ${lesson.employeeId}`}
                //secondary={secondary ? 'Secondary text' : null}
          />
        <IconButton >
            <ForwardToInboxIcon />
        </IconButton>
     <IconButton >
          <EditIcon />
     </IconButton>
  </ListItem>
 </>
  
));

  const handleAddLessonTypeClick = (event:any) =>{
     console.log("hello")
     //fetch from data base and add to the list
  };

  const handleAddLessonClick = () => {
    console.log("hiii")
  }

  const handleAddLessonType = () =>{
    setOpenLessonType(true);
  };

  const handleAddLesson = () =>{
    setOpenLesson(true);
  }

  return (
    <>
    <Grid container spacing={20} sx={{display:'flex' , alignItems:'center', justifyContent:'center'}}>
      
    <Grid item xs={12} md={5} >
          <Typography sx={{ mt: 6, mb: 2 , fontFamily:'Nunito'}} variant="h5" component="div">
            Lessons types
          </Typography>
          
          <Button variant="contained" onClick={handleAddLessonType}>Add Lesson Type</Button>
         
          <Demo>
            <List dense={dense}>
               
             {lessonsTypes}
            </List>
          </Demo>
        </Grid>

        <Grid item xs={12} md={5}>
          <Typography sx={{ mt: 6, mb: 2 , fontFamily:'Nunito'}} variant="h5" component="div">
            Lessons
          </Typography>
          <Button variant="contained" onClick={handleAddLesson}>Schedual a new Lesson</Button>
          <Demo>
            <List dense={dense}>
              {renderLessons}
            </List>
          </Demo>
        </Grid>
        </Grid>

      <Modal
        open={openLessonType}
        onClose={lessonTypeFormClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
         
          <LessonTypeForm  handleAddLessonTypeClick={handleAddLessonTypeClick}/>
  
          <Button onClick={lessonTypeFormClose}>
            Close
          </Button>
        </Box>
      </Modal>

      <Modal
        open={openLesson}
        onClose={lessonFormClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
         
          <LessonForm  handleAddLessonClick={handleAddLessonClick}/>
  
          <Button onClick={lessonFormClose}>
            Close
          </Button>
        </Box>
      </Modal>
      </>
       
  )
}

export default Lessons