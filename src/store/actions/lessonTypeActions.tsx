import { lessonTypeSlice } from "../slices/lessonTypeSlice";
import { AnyAction , ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { LessonType } from '../../models/lessonType';
import { lessonTypeService } from '../../services/lessonTypeService';

export const lessonTypeActions = lessonTypeSlice.actions;

export const getAllLessonTypes = () : ThunkAction<void,RootState,unknown,AnyAction> =>{
    return async (dispatch, getState) =>{
        const res: LessonType[] = await lessonTypeService.getAll();
        dispatch(lessonTypeActions.setLeesonsTypes(res));
    }
  }
  
export const getLessonType = (lesson_id:number) : ThunkAction<void,RootState,unknown,AnyAction> =>{
    return async (dispatch, getState) =>{
      const res: LessonType = await lessonTypeService.getOneLessonType(lesson_id);
      dispatch(lessonTypeActions.setLessonType(res))
    }
};

export const createLessonType = (formData:any) : ThunkAction<void,RootState,unknown,AnyAction> => {
    return async (dispatch,getState)=>{
      const res = await lessonTypeService.sendlessonTypeData(formData);
      dispatch(lessonTypeActions.createLessonType(res))
    }
};

export const editLessonType = (lesson_id:number , formData:any) : ThunkAction<void,RootState,unknown,AnyAction> =>{
    return async (dispatch, getState) =>{
      const res = await lessonTypeService.editOneLessonType(lesson_id, formData);
      dispatch(lessonTypeActions.editLessonType(res))
    }
};

export const deleteLessonType = (lesson_id:string) : ThunkAction<void,RootState,unknown,AnyAction> =>{
    return async (dispatch, getState) =>{
        await lessonTypeActions.deleteLessonType(lesson_id);
        //dispatch(lessonActions.deleteLesson(lesson_id))
    }
};