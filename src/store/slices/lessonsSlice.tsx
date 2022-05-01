import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Lesson } from "../../models/lesson";

interface LessonsSliceState {
  all_lessons: Lesson[];
  lesson: {
    id?: number;
    startDate: Date | null;
    endDate: Date | null;
    employeeId: number;
    lessonTypeId: number;
    coustomers?: any[];
  };
}

const initialState: LessonsSliceState = {
  all_lessons: [],
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
    setLeesons(state, action: PayloadAction<Lesson[]>) {
      // console.log("all lessons" , action.payload)
      state.all_lessons = action.payload;
    },
    setLesson(state, action: PayloadAction<Lesson>) {
      state.lesson = action.payload;
    },
    createLesson(state, action) {
      //state.lesson = action.payload;
      state.all_lessons = [...state.all_lessons, action.payload];
    },
    editLesson(state, action) {
      state.lesson = action.payload;
      // const idx = state.all_lessons.findIndex(
      //   (lesson) => lesson.id === action.payload.id
      // );
      // state.all_lessons.splice(idx, 1);
    },
    deleteLesson(state, action) {
      console.log(action.payload);
      const idx = state.all_lessons.findIndex(
        (lesson) => lesson.id === action.payload
      );
      state.all_lessons.splice(idx, 1);
    },
  },
});
