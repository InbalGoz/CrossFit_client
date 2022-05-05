import { notificationSlice } from "../slices/notificationSlice";
import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Notification } from "../../models/notification";
import { notificationService } from "../../services/notificationService";

export const notificationActions = notificationSlice.actions;

export const getAllNotifications = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatch, getState) => {
    const res: Notification[] = await notificationService.getAll();
    dispatch(notificationActions.setNotifications(res));
  };
};

export const getNotificationsByCustomerId = (
  customer_id: any
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const res: Notification[] =
      await notificationService.getNotificationsByCustomerId(customer_id);
    dispatch(notificationActions.getAllById(res));
  };
};

/*export const getNotification = (
  notification_id: any
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const res: Notification = await notificationService.getNotification(
      notification_id
    );
    dispatch(notificationActions.setNotification(res));
  };
};*/

export const createNotification = (
  notificationData: any
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const res = await notificationService.createNotification(notificationData);
    console.log({ res });
    dispatch(notificationActions.createNotification(res));
  };
};

export const createNotificationForAll = (
  notificationData: any
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const res = await notificationService.createForAll(notificationData);

    console.log("res notifi", res);

    dispatch(notificationActions.createNotificationForAll(res));
  };
};

export const editNotification = (
  notification_id: any,
  formData: any
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const res = await notificationService.editNotification(
      notification_id,
      formData
    );
    dispatch(notificationActions.editNotification(res));
  };
};

export const editAllNotification = (
  customer_id: any
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const res = await notificationService.editAllNotification(customer_id);
    dispatch(notificationActions.editAllNotifications(res));
  };
};

export const deleteNotification = (
  notification_id: any
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const res = await notificationService.deleteNotification(notification_id);
    dispatch(notificationActions.deleteNotification(notification_id));
  };
};
