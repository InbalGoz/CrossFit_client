import { lessonSlice } from "../slices/lessonsSlice";
import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Lesson } from "../../models/lesson";
import { lessonService } from "../../services/lessonService";

export const lessonActions = lessonSlice.actions;

export const getAllLessons = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatch, getState) => {
    const res: Lesson[] = await lessonService.getAll();
    dispatch(lessonActions.getAllLessons(res));
  };
};

/*export const getAllRecommendedLessons = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatch, getState) => {
    const res: Lesson[] = await lessonService.getRecommendedLessons();
    dispatch(lessonActions.getRecommendedLessons(res));
  };
};*/

export const getFullInfoLessons = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatch, getState) => {
    const res: Lesson[] = await lessonService.getFullInfoLessons();
    console.log("res lessons", res);
    dispatch(lessonActions.getFullInfoLessons(res));
  };
};

export const getLesson = (
  lesson_id: number
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const res: Lesson = await lessonService.getLesson(lesson_id);
    dispatch(lessonActions.getLesson(res));
  };
};

export const createLesson = (
  formData: any
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const res = await lessonService.createLesson(formData);
    dispatch(lessonActions.createLesson(res));
  };
};

export const editLesson = (
  lesson_id: any,
  formData: any
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const res = await lessonService.editLesson(lesson_id, formData);
    dispatch(lessonActions.editLesson(res));
  };
};

export const deleteLesson = (
  lesson_id: number
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const res = await lessonService.deleteLesson(lesson_id);
    dispatch(lessonActions.deleteLesson(lesson_id));
  };
};
