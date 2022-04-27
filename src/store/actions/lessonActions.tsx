import { lessonSlice } from "../slices/lessonsSlice";
import { AnyAction , ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Lesson } from '../../models/lesson';
import { lessonService } from '../../services/lessonService';

import { Res } from "../../models/res";

export const lessonActions = lessonSlice.actions;

export const getAllLessons = () : ThunkAction<void,RootState,unknown,AnyAction> =>{
    return async (dispatch, getState) =>{
        const res: Lesson[] = await lessonService.getAll();

        
        dispatch(lessonActions.setLeesons(res));
    }
  }
  
export const getLesson = (lesson_id:number) : ThunkAction<void,RootState,unknown,AnyAction> =>{
    return async (dispatch, getState) =>{
      const res: Lesson = await lessonService.getOneLesson(lesson_id);
      dispatch(lessonActions.setLesson(res))
    }
};

export const createLesson = (formData:any) : ThunkAction<void,RootState,unknown,AnyAction> => {
    return async (dispatch,getState)=>{
      const res = await lessonService.sendlessonData(formData);
      dispatch(lessonActions.createLesson(res))
    }
};

export const editLesson = (lesson_id:number , formData:any) : ThunkAction<void,RootState,unknown,AnyAction> =>{
    return async (dispatch, getState) =>{
      const res = await lessonService.editOneLesson(lesson_id, formData);
      dispatch(lessonActions.editLesson(res))
    }
};

export const deleteLesson = (lesson_id:number|undefined) : ThunkAction<void,RootState,unknown,AnyAction> =>{
    return async (dispatch, getState) =>{
        await lessonService.deleteLesson(lesson_id);
        //dispatch(lessonActions.deleteLesson(lesson_id))
    }
};