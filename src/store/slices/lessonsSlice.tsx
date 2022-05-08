import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Lesson } from '../../models/lesson';

interface LessonsSliceState {
  all_lessons: Lesson[];
  all_fullInfoLessons: Lesson[];
}

const initialState: LessonsSliceState = {
  all_lessons: [],
  all_fullInfoLessons: [],
};

export const lessonSlice = createSlice({
  name: 'lesson',
  initialState,
  reducers: {
    getAllLessons(state, action: PayloadAction<Lesson[]>) {
      state.all_lessons = action.payload;
    },
    getLesson(state, action: PayloadAction<Lesson>) {
      // state.lesson = action.payload;
    },
    getFullInfoLessons(state, action: PayloadAction<Lesson[]>) {
      state.all_fullInfoLessons = action.payload;
    },
    createLesson(state, action) {
      state.all_fullInfoLessons = [
        ...state.all_fullInfoLessons,
        action.payload,
      ];
    },
    editLesson(state, action) {
      const copy = [...state.all_fullInfoLessons];
      const idx = copy.findIndex((lesson) => lesson.id === action.payload.id);
      copy.splice(idx, 1, action.payload);
      state.all_fullInfoLessons = copy;
    },
    deleteLesson(state, action) {
      const newLessonArr = state.all_lessons.filter(
        (lesson) => lesson.id !== action.payload
      );
      state.all_lessons = newLessonArr;

      const newFullLessonArr = state.all_fullInfoLessons.filter(
        (lesson) => lesson.id !== action.payload
      );
      state.all_fullInfoLessons = newFullLessonArr;
    },
  },
});
