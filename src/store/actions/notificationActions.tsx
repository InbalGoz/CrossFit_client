import { notificationSlice } from "../slices/notificationSlice";
import { AnyAction , ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Notification } from '../../models/notification';
import { notificationService } from '../../services/notificationService';

export const notificationActions = notificationSlice.actions;

export const getAllNotificationsById = () : ThunkAction<void,RootState,unknown,AnyAction> =>{
    return async (dispatch, getState) =>{
        const res: Notification[] = await notificationService.getAll();
        dispatch(notificationActions.setNotifications(res));
    }
  }
  
export const getNotification = (notification_id:number) : ThunkAction<void,RootState,unknown,AnyAction> =>{
    return async (dispatch, getState) =>{
      const res: Notification = await notificationService.getOneNotification(notification_id);
      dispatch(notificationActions.setNotification(res))
    }
};

export const createNotification = (formData:any) : ThunkAction<void,RootState,unknown,AnyAction> => {
    return async (dispatch,getState)=>{
      const res = await notificationService.sendNotificationData(formData);
      dispatch(notificationActions.createNotification(res))
    }
};

export const editNotification = (notification_id:number , formData:any) : ThunkAction<void,RootState,unknown,AnyAction> =>{
    return async (dispatch, getState) =>{
      const res = await notificationService.editOneNotification(notification_id, formData);
      dispatch(notificationActions.editNotification(res))
    }
};

export const deleteNotification = (notification_id:number) : ThunkAction<void,RootState,unknown,AnyAction> =>{
    return async (dispatch, getState) =>{
        await notificationService.deleteNotificationn(notification_id);
        //dispatch(lessonActions.deleteLesson(lesson_id))
    }
};