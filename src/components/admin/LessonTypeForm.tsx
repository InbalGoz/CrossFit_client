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
//import { Link as ToLink } from 'react-router-dom';

//redux
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  createLessonType,
  getAllLessonTypes,
} from "../../store/actions/lessonTypeActions";

const LessonTypeForm: React.FC = () => {
  const tagsArr: any[] = ["Sport"];
  let newTags: any[] = [];
  const levels = ["Easy", "Medium", "Hard"];

  const dispatch = useAppDispatch();
  const all_lessonTypes = useAppSelector(
    (state) => state.lessonType.all_lessonTypes
  );
  const [tagsState, setTags] = useState(new Array(tagsArr.length).fill(false));
  const initialLessonType: LessonType = {
    title: "",
    tags: [],
    max: 0,
    level: "",
  };

  const [formData, setFormData] = useState(initialLessonType);

  const { title, tags, max, level } = formData;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [event.target.name]: event.target.value });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("lessontypeform submit", formData);
    newTags = [];
    dispatch(createLessonType(formData));
  };

  const handleTagsChange = (position: any) => {
    const updatedCheckedState = tagsState.map((item, index) =>
      index === position ? !item : item
    );

    setTags(updatedCheckedState);

    if (updatedCheckedState[position]) {
      addToTags(position);
    } else {
      let index = newTags.indexOf(tagsArr[position]);
      removeFromTags(index);
    }

    setFormData({ ...formData, tags: newTags });
  };

  const addToTags = (position: any) => {
    newTags.push(tagsArr[position]);
  };

  const removeFromTags = (index: any) => {
    newTags.splice(index, 1);
  };

  const handleLevelChange = (event: any) => {
    setFormData({ ...formData, level: event.target.value });
  };

  useEffect(() => {
    dispatch(getAllLessonTypes());
    console.log("lessontypeform", formData);
  }, [formData]);

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
                              key={tagsArr[index]}
                              checked={tagsState[index]}
                              onChange={() => handleTagsChange(index)}
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
              // onClick={handleAddLessonTypeClick}
            >
              Add
            </Button>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default LessonTypeForm;
