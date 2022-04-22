import axios from 'axios';
import devConfig from '../env/dev';
import { Notification } from '../models/notification';

export const notificationService = {
  getAll,
  getOneNotification,
  sendNotificationData,
  editOneNotification,
  deleteNotificationn
};

const BASE_URL = `${devConfig.base_url}/notifications`;

async function getAll(): Promise<Notification[]> {
  const res: any = axios.get(`${BASE_URL}`).then((res)=>  res.data);
  return res;
};

async function getOneNotification(notification_id: number): Promise<Notification> {
  const res: any = axios.get(`${BASE_URL}`).then((res)=>  res.data);
  return res.filter((notification:Notification) => notification.id === notification_id)[0];
};

async function sendNotificationData(formData:any): Promise<void>{
  const res: any = axios.post(`${BASE_URL}`, formData)
};

async function editOneNotification(lesson_id: number , formData:any) {
  const res: any = axios.put(`${BASE_URL}` , formData);

};

async function deleteNotificationn(lesson_id: string) {
  const res: any = axios.delete(`${BASE_URL}`);
};