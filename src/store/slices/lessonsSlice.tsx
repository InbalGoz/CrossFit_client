import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Lesson } from '../../models/lesson';

interface LessonsSliceState {
    all_lessons: Lesson[];  
    lesson:{
        _id:string;
        id?:number;
        date:Date | null;
        employeeId:number;
        lessonTypeId:number;
        employees?:any[];
     }; 
};
   
const initialState : LessonsSliceState = {
    all_lessons: [],
     lesson: {
         _id:'',
        date: null,
        employeeId:0,
        lessonTypeId:0,
        employees:[],
    } 
};

export const lessonSlice = createSlice({
  name:'lesson',
  initialState,
  reducers:{
    setLeesons( state , action:PayloadAction<Lesson[]>){
        state.all_lessons = action.payload;
    },
    setLesson( state , action:PayloadAction<Lesson>){
        state.lesson = action.payload;
    },
    createLesson(state , action){

    },
    editLesson(state , action){
       state.lesson = action.payload;
    },
    deleteLesson(state , action){

    }  
  }
});