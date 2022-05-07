import { AnyAction, ThunkAction } from '@reduxjs/toolkit';
import { customerToLessonSlice } from '../slices/customerToLessonSlice';
import { RootState } from '../store';
import { CustomerToLesson } from '../../models/customerToLesson';
import { customerToLessonService } from '../../services/customerToLessonService';

export const customerToLessonActions = customerToLessonSlice.actions;

export const getAllLessons = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatch, getState) => {
    const res: CustomerToLesson[] = await customerToLessonService.getAll();
    dispatch(customerToLessonActions.getAllCustomerToLesson(res));
  };
};

export const getCTLById = (
  data: any
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const res: CustomerToLesson = await customerToLessonService.getById(data);
    dispatch(customerToLessonActions.getCustomerToLesson(res));
  };
};

export const createCustomerToLesson = (
  data: any
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const res = await customerToLessonService.createCTL(data);

    console.log('res', res);
    if (res) {
      dispatch(customerToLessonActions.createCustomerToLesson(res));
    }
  };
};

export const deleteCustomerToLesson = (
  data: any
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const res = await customerToLessonService.deleteCTL(data);
    dispatch(customerToLessonActions.deleteCustomerToLesson(res));
  };
};
