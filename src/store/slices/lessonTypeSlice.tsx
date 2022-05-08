import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { LessonType } from '../../models/lessonType';

interface LessonTypeSliceState {
  all_lessonTypes: LessonType[];
}

const initialState: LessonTypeSliceState = {
  all_lessonTypes: [],
};

export const lessonTypeSlice = createSlice({
  name: 'lessonType',
  initialState,
  reducers: {
    setLeesonsTypes(state, action: PayloadAction<LessonType[]>) {
      state.all_lessonTypes = action.payload;
    },
    setLessonType(state, action: PayloadAction<LessonType>) {
      ///-----------------
    },
    createLessonType(state, action) {
      state.all_lessonTypes = [...state.all_lessonTypes, action.payload];
    },
    editLessonType(state, action) {
      const copy = [...state.all_lessonTypes];
      const idx = copy.findIndex((lt) => lt.id === action.payload.id);
      copy.splice(idx, 1, action.payload);
      state.all_lessonTypes = copy;
    },
    deleteLessonType(state, action) {
      const newLessonTypesrArr = state.all_lessonTypes.filter(
        (lessonType) => lessonType.id !== action.payload
      );
      state.all_lessonTypes = newLessonTypesrArr;
    },
  },
});
