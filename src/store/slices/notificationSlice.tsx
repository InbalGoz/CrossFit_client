import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Notification } from '../../models/notification';

interface NotificationSliceState {
  all_notifications: Notification[];
  all_notificationsById: Notification[];
  notification: Notification;
}

const initialState: NotificationSliceState = {
  all_notifications: [],
  all_notificationsById: [],
  notification: {
    id: 0,
    title: '',
    desc: '',
    isRead: false,
    createdAt: null,
    customerId: 0,
  },
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotifications(state, action: PayloadAction<Notification[]>) {
      state.all_notifications = action.payload;
    },
    getAllById(state, action) {
      state.all_notificationsById = action.payload;
    },
    createNotification(state, action) {
      state.all_notificationsById = [
        ...state.all_notificationsById,
        action.payload,
      ];
    },
    createNotificationForAll(state, action) {
      state.all_notifications = [...state.all_notifications, action.payload];
    },
    editNotification(state, action) {
      //-----
      state.notification = action.payload;
    },
    editAllNotifications(state, action) {
      state.all_notificationsById = action.payload;
    },
    deleteNotification(state, action) {
      // console.log("delete notifi", action.payload);
      const newNotificationrArr = state.all_notificationsById.filter(
        (nById) => nById.id !== action.payload
      );
      state.all_notificationsById = newNotificationrArr;
    },
  },
});
