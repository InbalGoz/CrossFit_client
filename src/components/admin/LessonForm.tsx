import React, { useState, useEffect } from "react";
import { Lesson } from "../../models/lesson";
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
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
//import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

//redux
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { createLesson } from "../../store/actions/lessonActions";
import {
  getAllLessonTypes,
  getLessonType,
} from "../../store/actions/lessonTypeActions";
import {
  getAllEmployees,
  getEmployee,
} from "../../store/actions/employeeActions";

const LessonForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const all_employees = useAppSelector((state) => state.employee.all_employees);
  const all_lessonTypes = useAppSelector(
    (state) => state.lessonType.all_lessonTypes
  );

  const initialLesson: Lesson = {
    startDate: null,
    endDate: null,
    employeeId: 0,
    lessonTypeId: 0,
  };

  const [formData, setFormData] = useState(initialLesson);
  const { startDate, endDate, employeeId, lessonTypeId } = formData;

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log("formData submit", formData);
    const form = {
      ...formData,
      endDate: formData.endDate?.toLocaleString(),
      startDate: formData.startDate?.toLocaleString(),
    };

    dispatch(createLesson(form));
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

    console.log("formData", formData);
  }, []);

  return (
    <Container component='main' sx={{ maxWidth: 500 }}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          component='h1'
          variant='h5'
          sx={{ color: "#8A2BE2", fontWeight: "bold" }}
        >
          Schedual new lesson:
        </Typography>

        <Box component='form' noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  renderInput={(params: any) => <TextField {...params} />}
                  label='Start Date and Time'
                  value={formData.startDate}
                  onChange={(newValue: any) => {
                    //setValue(newValue);
                    setFormData({
                      ...formData,
                      startDate: new Date(newValue),
                    });
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  renderInput={(params: any) => <TextField {...params} />}
                  label='End Date and Time'
                  value={formData.endDate}
                  onChange={(newValue: any) => {
                    setFormData({ ...formData, endDate: new Date(newValue) });
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
            Add
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LessonForm;
