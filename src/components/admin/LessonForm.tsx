import React, { useState, useEffect } from 'react';
import { FullLesson, Lesson } from '../../models/lesson';
import {
  Container,
  Box,
  CssBaseline,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
//import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import momentTimezone from 'moment-timezone';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { he } from 'date-fns/locale';

//redux
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  createLesson,
  editLesson,
  getFullInfoLessons,
} from '../../store/actions/lessonActions';
import {
  getAllLessonTypes,
  getLessonType,
} from '../../store/actions/lessonTypeActions';
import {
  getAllEmployees,
  getEmployee,
} from '../../store/actions/employeeActions';
import Swal from 'sweetalert2';

interface Props {
  close: any;
  lesson: FullLesson | null;
}

const LessonForm: React.FC<Props> = ({ close, lesson }) => {
  // const timeZoneFromServer = "Europe/Israel ";
  // const { moment } = new AdapterMoment({ instance: momentTimezone });
  // const dateWithTimeZone = moment().tz(timeZoneFromServer);

  //momentTimezone.tz.setDefault("Europe/Israel");

  const dispatch = useAppDispatch();
  const all_employees = useAppSelector((state) => state.employee.all_employees);
  const all_lessonTypes = useAppSelector(
    (state) => state.lessonType.all_lessonTypes
  );
  const [formData, setFormData] = useState<Lesson>(
    convertLesson() || {
      startDate: new Date(),
      endDate: new Date(),
      employeeId: 0,
      lessonTypeId: 0,
    }
  );

  function convertLesson() {
    if (lesson) {
      return {
        id: lesson.id,
        startDate: lesson.startDate,
        endDate: lesson.endDate,
        employeeId:
          all_employees.find((e) => {
            return (
              e.fName === lesson.employeeFName &&
              e.lName === lesson.employeeLName
            );
          })?.id || 0,
        lessonTypeId:
          all_lessonTypes.find((l) => l.title === lesson.title)?.id || 0,
      };
    } else {
      return null;
    }
  }
  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (
      formData.employeeId &&
      formData.lessonTypeId &&
      formData.endDate &&
      formData.startDate
    ) {
      if (formData.id) {
        dispatch(editLesson(formData));
      } else {
        dispatch(createLesson(formData));
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'error',
        text: 'Must fill all fields',
      });
    }
    close();
  };

  const handleEmployeeChange = (event: any) => {
    setFormData({ ...formData, employeeId: event.target.value });
  };

  const handleLessonTagTypeChange = (event: any) => {
    setFormData({ ...formData, lessonTypeId: event.target.value });
  };

  const menuItemsEmployees = all_employees.map((employee, index) => (
    <MenuItem key={employee.id} value={employee.id}>
      {employee.fName} {employee.lName}
    </MenuItem>
  ));

  const menuItemsLessonTypes = all_lessonTypes.map((lessonType, index) => (
    <MenuItem key={lessonType.id} value={lessonType.id}>
      {lessonType.title}
    </MenuItem>
  ));

  useEffect(() => {
    dispatch(getAllEmployees());
    dispatch(getAllLessonTypes());
  }, []);

  return (
    <Container component='main' sx={{ maxWidth: 500 }}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          component='h1'
          variant='h5'
          sx={{ color: '#8A2BE2', fontWeight: 'bold' }}
        >
          Schedual new lesson:
        </Typography>

        <Box component='form' noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  inputFormat='dd.MM.yyyy hh:mm'
                  renderInput={(params: any) => <TextField {...params} />}
                  label='Start Date and Time'
                  //value={dateWithTimeZone}
                  value={formData.startDate}
                  onChange={(newValue: any) => {
                    console.log('newValue', new Date(newValue));
                    //setValue(newValue);
                    setFormData({
                      ...formData,
                      startDate: new Date(`${newValue}`),
                    });
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  inputFormat='dd.MM.yyyy hh:mm'
                  renderInput={(params: any) => <TextField {...params} />}
                  label='End Date and Time'
                  // value={dateWithTimeZone}
                  value={formData.endDate}
                  onChange={(newValue: any) => {
                    setFormData({
                      ...formData,
                      endDate: new Date(`${newValue}`),
                    });
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>
                  Choose Employee:
                </InputLabel>
                <Select
                  value={formData.employeeId}
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  label='Choose Employee:'
                  onChange={handleEmployeeChange}
                >
                  <MenuItem value={0}>Choose Employee:</MenuItem>
                  {menuItemsEmployees}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>
                  Choose Lesson type :
                </InputLabel>
                <Select
                  value={formData.lessonTypeId}
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  label='Choose Lesson type:'
                  onChange={handleLessonTagTypeChange}
                >
                  <MenuItem value={0}>Choose Lesson type:</MenuItem>
                  {menuItemsLessonTypes}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Button
            type='submit'
            fullWidth
            variant='contained'
            onClick={handleSubmit}
            sx={{ mt: 3, mb: 2 }}
          >
            {formData.id ? 'Edit' : 'Add'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LessonForm;
