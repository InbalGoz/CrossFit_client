import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Lesson } from "../../models/lesson";

interface LessonsSliceState {
  all_lessons: Lesson[];
  all_fullInfoLessons: Lesson[];
  lesson: Lesson;
}

const initialState: LessonsSliceState = {
  all_lessons: [],
  all_fullInfoLessons: [],
  lesson: {
    id: 0,
    startDate: null,
    endDate: null,
    employeeId: 0,
    lessonTypeId: 0,
    coustomers: [],
  },
};

export const lessonSlice = createSlice({
  name: "lesson",
  initialState,
  reducers: {
    getAllLessons(state, action: PayloadAction<Lesson[]>) {
      state.all_lessons = action.payload;
    },
    getLesson(state, action: PayloadAction<Lesson>) {
      state.lesson = action.payload;
    },
    getFullInfoLessons(state, action: PayloadAction<Lesson[]>) {
      state.all_fullInfoLessons = action.payload;
    },
    createLesson(state, action) {
      console.log("action.payload FullInfoLessons", action.payload);
      state.all_lessons = [...state.all_lessons, action.payload];
      /*state.all_fullInfoLessons = [
        ...state.all_fullInfoLessons,
        action.payload,
      ];*/
    },
    editLesson(state, action) {
      state.lesson = action.payload;
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
