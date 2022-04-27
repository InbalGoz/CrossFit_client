import axios from 'axios';
import devConfig from '../env/dev';
import { Notification } from '../models/notification';
import { resService } from './resService';

export const notificationService = {
  getAll,
  getAllById,
  getOneNotification,
  sendNotificationData,
  editOneNotification,
  deleteNotificationn,
};

const BASE_URL = `${devConfig.base_url}/notifications`;

async function getAll(): Promise<Notification[]> {
  const res: any = axios.get(`${BASE_URL}`);
  return res.data.success
    ? resService.handleSuccess(res)
    : resService.handleErr(res);
}

async function getAllById(customer_id:string): Promise<Notification[]> {
  const res: any = axios.get(`${BASE_URL}`);
  return res.data.success
    ? resService.handleSuccess(res)
    : resService.handleErr(res);
}

async function getOneNotification(
  notification_id: number
): Promise<Notification> {
  const res: any = axios.get(`${BASE_URL}`).then((res) => res.data);
  // return res.filter(
  //   (notification: Notification) => notification.id === notification_id
  // )[0];
  return res.data.success
    ? resService.handleSuccess(res)
    : resService.handleErr(res);
}

async function sendNotificationData(formData: any): Promise<void> {
  const res: any = axios.post(`${BASE_URL}`, formData);
  return res.data.success
    ? resService.handleSuccess(res)
    : resService.handleErr(res);
}

async function editOneNotification(notification_id: number, formData: any) {
  const res: any = axios.put(`${BASE_URL}`, formData);
  return res.data.success
    ? resService.handleSuccess(res)
    : resService.handleErr(res);
}

async function deleteNotificationn(notification_id: number) {
  const res: any = axios.delete(`${BASE_URL}`);
  return res.data.success
    ? resService.handleSuccess(res)
    : resService.handleErr(res);
}
