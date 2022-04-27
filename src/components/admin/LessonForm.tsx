import React, { useState } from 'react';
import { Lesson } from '../../models/lesson';
import { Container , Box , CssBaseline , Typography , TextField , Button  } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

//redux
import { useAppDispatch } from "../../store/hooks";
import { createLesson } from '../../store/actions/lessonActions';

interface Props {
  handleAddLessonClick: any;
}

const LessonForm:React.FC<Props> = ({ handleAddLessonClick }) => {

  const dispatch = useAppDispatch();

  const initialLesson : Lesson = {
    date: null,
    employeeId: 0,
    lessonTypeId: 0,
    employees: [],
  } ;

  //bring all  employees and lessonstype
  //employeeId - select
  //lessonTypeId - select
  //employees checkbox
  

  const [formData, setFormData] = useState(initialLesson);

  const { date , employeeId , lessonTypeId , employees } = formData;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [event.target.name]: event.target.value });
  
  const handleSubmit = ( event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        //send to data base
        dispatch(createLesson(formData));
  };

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
            Schedual new lesson:
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                     label="Lesson Date"
                     value={date}
                     onChange={(newValue) => {
                      //setValue(newValue);
                      setFormData(prevData => {
                        return{
                         ...prevData,
                         date:newValue
                        }
                      })

                      }}
                     renderInput={(params) => <TextField fullWidth {...params} />}
                  />
              </LocalizationProvider>
            <TextField
              margin="normal"
              required
              fullWidth
              name="employeeId"
              label="Employee Id"
              type="employeeId"
              id="employeeId"
              autoComplete="tags"
              onChange={onChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="lessonTypeId"
              label="Lesson Type Id"
              type="lessonTypeId"
              id="lessonTypeId"
              autoComplete="lessonTypeId"
              onChange={onChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="employees"
              label="Employees"
              type="employees"
              id="employees"
              autoComplete="employees"
              onChange={onChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleAddLessonClick}
            >
              Add  
            </Button>
          </Box>
        </Box>
    
      </Container>
  )
}

export default LessonForm