import axios from 'axios';
import devConfig from '../env/dev';
import { Notification } from '../models/notification';
import { resService } from './resService';
import { Res } from '../models/res';

export const notificationService = {
  getAll,
  getAllById,
  getNotification,
  createNotification,
  editNotification,
  deleteNotification,
};

const BASE_URL = `${devConfig.base_url}/notifications`;

async function getAll(): Promise<Notification[]> {
  const res: Res = await axios.get(`${BASE_URL}`);
  return res.data.success
    ? resService.handleSuccess(res)
    : resService.handleErr(res);
};

//add to server
async function getAllById(customer_id:string): Promise<Notification[]> {
  const res: Res = await axios.get(`${BASE_URL}`);
  return res.data.success
    ? resService.handleSuccess(res)
    : resService.handleErr(res);
};

//add to server
async function getNotification(
  notification_id: number
): Promise<Notification> {
  const res: Res = await axios.get(`${BASE_URL}`);
  return res.data.success
    ? resService.handleSuccess(res)
    : resService.handleErr(res);
};

async function createNotification(formData: any) {
  const res: Res = await axios.post(`${BASE_URL}`, formData);
  return res.data.success
    ? resService.handleSuccess(res)
    : resService.handleErr(res);
};

async function editNotification(notification_id: number, formData: any) {
  const res: Res = await axios.put(`${BASE_URL}/${notification_id}`, formData);
  return res.data.success
    ? resService.handleSuccess(res)
    : resService.handleErr(res);
};

async function deleteNotification(notification_id: number) {
  const res: Res = await axios.delete(`${BASE_URL}/${notification_id}`);
  return res.data.success
    ? resService.handleSuccess(res)
    : resService.handleErr(res);
};
