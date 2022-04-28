import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Lesson } from '../../models/lesson';

interface LessonsSliceState {
    all_lessons: Lesson[];  
    lesson:{
      //id: number;
      startDate: Date | null;
      endDate: Date | null;
      employeeId: number;
      lessonTypeId: number;
      employees: any[];

        //coustomers?:any[];
     }; 
};
   
const initialState : LessonsSliceState = {
    all_lessons: [],
     lesson: {
      //id: 0,
      startDate: null,
      endDate: null,
      employeeId: 0,
      lessonTypeId: 0,
      employees: [],
       // coustomers:[],
    } 
};

export const lessonSlice = createSlice({
  name:'lesson',
  initialState,
  reducers:{
    setLeesons( state , action:PayloadAction<Lesson[]>){
       // console.log("all lessons" , action.payload)
        state.all_lessons = action.payload;
    },
    setLesson( state , action:PayloadAction<Lesson>){
        state.lesson = action.payload;
    },
    createLesson(state , action){
      state.lesson = action.payload;
    },
    editLesson(state , action){
       state.lesson = action.payload;
    },
    deleteLesson(state , action){
      state.lesson = {
       // id: 0,
        startDate: null,
        endDate: null,
        employeeId: 0,
        lessonTypeId: 0,
        employees: [],
      };
    }  
  }
});