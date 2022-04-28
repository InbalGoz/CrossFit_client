import React, { useState } from 'react';
import { Lesson } from '../../models/lesson';
import { Container , Box , CssBaseline , Typography , TextField , Button  } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
//import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

//redux
import { useAppDispatch } from "../../store/hooks";
import { createLesson } from '../../store/actions/lessonActions';
import { useEffect } from 'react';


const LessonForm:React.FC = () => {

  const dispatch = useAppDispatch();

  const initialLesson : Lesson = {
      startDate: null,
      endDate: null,
      employeeId: 0,
      lessonTypeId: 0,
      employees: [],
  } ;

  //bring all  employees and lessonstype
  //employeeId - select
  //lessonTypeId - select
  //employees checkbox
  

  const [formData, setFormData] = useState(initialLesson);

  const { startDate , endDate , employeeId , lessonTypeId , employees } = formData;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }
    
  
  const handleSubmit = ( event: any) => {
        event.preventDefault();
        
        console.log("formData submit" , formData)
        dispatch(createLesson(formData));
  };

  useEffect(()=>{
    console.log("formData" , formData)
  },[formData])

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
          <Box  sx={{ mt: 3 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns} >
                  <DateTimePicker
                    renderInput={(params:any) => <TextField sx={{mr: 8}}  {...params} />}
                    label="Start Date and Time"
                    value={formData.startDate}
                    
                    onChange={(newValue:any) => {
                      //setValue(newValue);
                       setFormData(prevData => {
                         return{
                          ...prevData,
                          startDate:new Date(newValue)
                         }
                       })

                    }}
                  />
              </LocalizationProvider>

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    renderInput={(params:any) => <TextField  {...params} />}
                    label="End Date and Time"
                    value={formData.endDate}
                    onChange={(newValue:any) => {
                      //setValue(newValue);
                       setFormData(prevData => {
                         return{
                          ...prevData,
                          endDate:new Date(newValue)
                         }
                       })

                    }}
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
             // type="submit"
             variant="contained"
             fullWidth 
             onClick={handleSubmit}
            >
              Add  
            </Button>
          </Box>
        </Box>
    
      </Container>
  )
}

export default LessonForm;



