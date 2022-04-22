import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { LessonType } from '../../models/lessonType';

interface LessonTypeSliceState {
    all_lessonTypes: LessonType[];  
    lessonType:{
        id?: number;
        title: string;
        tags: string[];
        max: number;
        level: string
     }; 
};
   
const initialState : LessonTypeSliceState = {
    all_lessonTypes: [],
    lessonType: {
        id:0,
        title: '',
        tags:[],
        max:0,
        level:'',
    } 
};

export const lessonTypeSlice = createSlice({
  name:'lessonType',
  initialState,
  reducers:{
    setLeesonsTypes( state , action:PayloadAction<LessonType[]>){
        state.all_lessonTypes = action.payload;
    },
    setLessonType( state , action:PayloadAction<LessonType>){
        state.lessonType = action.payload;
    },
    createLessonType(state , action){

    },
    editLessonType(state , action){
       state.lessonType = action.payload;
    },
    deleteLessonType(state , action){

    }  
  }
});