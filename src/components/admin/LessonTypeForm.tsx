import React, { useState, useEffect } from "react";
import { LessonType } from "../../models/lessonType";
import {
  Container,
  Box,
  CssBaseline,
  Typography,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Paper,
  Grid,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useAppDispatch } from "../../store/hooks";
import {
  createLessonType,
  editLessonType,
  getAllLessonTypes,
} from "../../store/actions/lessonTypeActions";
import Swal from "sweetalert2";

const tagsArr: any[] = [
  "גמישות",
  "חיזוק",
  "יציבות",
  "נשימה",
  "מתיחות",
  "שרירי ליבה",
  "קורדינציה",
  "איזון",
  "שיווי משקל",
  "אירובי",
  "סיבולת לב ריאה",
  "סיבולת שריר",
  "שריפת שומנים",
  "חיטוב",
  "שרירי רגליים",
  "שרירי בטן",
  "עצימות גבוהה",
  "אימון רצועות",
  "כוח מתפרץ",
  "זריזות",
];
const levels = ["מתחילים", "מתקדמים", "מומחים"];
const LessonTypeForm = ({ close, lessonType }: any) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<LessonType>(
    lessonType || {
      title: "",
      tags: [],
      max: 0,
      level: "",
    }
  );

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [event.target.name]: event.target.value });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formData.level && formData.max && formData.title) {
      if (formData.id) {
        dispatch(editLessonType(formData));
      } else {
        dispatch(createLessonType(formData));
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "error",
        text: "Must fill all fields",
      });
    }
    close();
  };

  const handleTagsChange = (tag: string) => {
    const copy: LessonType = JSON.parse(JSON.stringify(formData));
    const idx = copy.tags.findIndex((t) => t === tag);
    if (idx !== -1) {
      copy.tags.splice(idx, 1);
    } else {
      copy.tags.push(tag);
    }
    setFormData(copy);
  };

  const handleLevelChange = (event: any) => {
    setFormData({ ...formData, level: event.target.value });
  };

  useEffect(() => {
    dispatch(getAllLessonTypes());
  }, []);

  const menuItemsLevels = levels.map((level_item: any, index) => (
    <MenuItem key={index} value={level_item}>
      {level_item}
    </MenuItem>
  ));

  return (
    <Container component='main' maxWidth='md'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component='h1' variant='h3' sx={{ fontFamily: "Nunito" }}>
          New Lesson type:
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                margin='normal'
                required
                fullWidth
                id='title'
                label='Title'
                name='title'
                autoComplete='title'
                autoFocus
                onChange={onChange}
                value={formData.title}
              />
            </Grid>

            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <Grid container>
                  <Grid item>
                    <InputLabel>Choose lesson days:</InputLabel>
                    {tagsArr.map((tag, index) => {
                      return (
                        <FormControlLabel
                          control={
                            <Checkbox
                              id={`custom-checkbox-${index}`}
                              name={tag}
                              value={tag}
                              key={tag}
                              checked={formData.tags.includes(tag)}
                              onChange={() => handleTagsChange(tag)}
                              color='primary'
                            />
                          }
                          label={tag}
                        />
                      );
                    })}
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <TextField
                margin='normal'
                required
                fullWidth
                name='max'
                label='Max'
                type='max'
                id='max'
                autoComplete='max'
                onChange={onChange}
                value={formData.max}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>
                  Choose Level:
                </InputLabel>
                <Select
                  value={formData.level}
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  label='Choose Employee:'
                  onChange={handleLevelChange}
                >
                  {menuItemsLevels}
                </Select>
              </FormControl>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              {formData.id ? "Edit" : "Add"}
            </Button>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default LessonTypeForm;
