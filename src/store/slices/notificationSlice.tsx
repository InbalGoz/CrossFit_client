import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Notification } from '../../models/notification';

interface NotificationSliceState {
    all_notifications: Notification[];  
    notification:{
        id?: number;
        title: string;
        desc: string;
        isRead: boolean;
        createdAt: Date | null;
    }; 
};
   
const initialState : NotificationSliceState = {
    all_notifications: [],
    notification: {
        id: 0,
        title: '',
        desc: '',
        isRead: false,
        createdAt: null,
    } 
};

export const notificationSlice = createSlice({
  name:'notification',
  initialState,
  reducers:{
    setNotifications( state , action:PayloadAction<Notification[]>){
        state.all_notifications = action.payload;
    },
    setNotification( state , action:PayloadAction<Notification>){
        state.notification = action.payload;
    },
    createNotification(state , action){
        state.notification = action.payload;
    },
    editNotification(state , action){
       state.notification = action.payload;
    },
    deleteNotification(state , action){
        state.notification = {
            id: 0,
            title: '',
            desc: '',
            isRead: false,
            createdAt: null,
        };
    }  
  }
});