import React, { useState } from 'react';
import { LessonType } from '../../models/lessonType';
import { Container , Box , CssBaseline , Typography , TextField , Button } from '@mui/material';
//import { Link as ToLink } from 'react-router-dom';

//redux
import { useAppDispatch } from "../../store/hooks";
import { createLessonType } from '../../store/actions/lessonTypeActions';
import { useEffect } from 'react';

/*interface Props {
    handleAddLessonTypeClick: any;
}*/

const LessonTypeForm:React.FC= () => {
  const dispatch = useAppDispatch();
  const initialLessonType : LessonType ={
    title: '',
    tags: [],
    max: 0,
    level: '',
  } 

  const [formData, setFormData] = useState(initialLessonType);

  const { title , tags , max , level } = formData;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [event.target.name]: event.target.value });
  
  const handleSubmit = ( event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("lessontypeform submit" , formData)
        //send to data base
        dispatch(createLessonType(formData));
  };

  useEffect(()=>{
    console.log("lessontypeform" , formData)
  },[formData])

  //tags = checkbox

  return (
    <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h3" sx={{fontFamily:'Nunito' }}>
            New Lesson type:
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              autoComplete="title"
              autoFocus
              onChange={onChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="tags"
              label="Tags"
              type="tags"
              id="tags"
              autoComplete="tags"
              onChange={onChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="max"
              label="Max"
              type="max"
              id="max"
              autoComplete="max"
              onChange={onChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="level"
              label="Level"
              type="level"
              id="level"
              autoComplete="level"
              onChange={onChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
             // onClick={handleAddLessonTypeClick}
            >
              Add  
            </Button>
          </Box>
        </Box>
    
      </Container>
  )
}

export default LessonTypeForm;