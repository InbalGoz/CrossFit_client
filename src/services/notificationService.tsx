import axios from "axios";
import devConfig from "../env/dev";
import { Notification } from "../models/notification";
import { resService } from "./resService";
import { Res } from "../models/res";
import Swal from "sweetalert2";

export const notificationService = {
  getAll,
  getAllById,
  getNotification,
  createNotification,
  createForAll,
  editNotification,
  deleteNotification,
  getNotificationsByCustomerId,
  editAllNotification,
};

const BASE_URL = `${devConfig.base_url}/notifications`;

//
async function getAll(): Promise<Notification[]> {
  const res: Res = await axios.get(`${BASE_URL}`);
  return res.data.success
    ? resService.handleSuccess(res)
    : resService.handleErr(res);
}

//add to server
async function getAllById(customer_id: string): Promise<Notification[]> {
  const res: Res = await axios.get(`${BASE_URL}`);
  return res.data.success
    ? resService.handleSuccess(res)
    : resService.handleErr(res);
}

//add to server 1
async function getNotification(notification_id: number): Promise<Notification> {
  const res: Res = await axios.get(`${BASE_URL}/${notification_id}`);
  return res.data.success
    ? resService.handleSuccess(res)
    : resService.handleErr(res);
}

//2
async function getNotificationsByCustomerId(
  customer_id: number
): Promise<Notification[]> {
  const res: Res = await axios.get(`${BASE_URL}/customer/${customer_id}`);

  console.log("resnoti", res);

  return res.data.success
    ? resService.handleSuccess(res)
    : resService.handleErr(res);
}

async function editAllNotification(customer_id: number) {
  const res: Res = await axios.put(`${BASE_URL}/all/${customer_id}`);
  return res.data.success
    ? resService.handleSuccess(res)
    : resService.handleErr(res);
}

async function createNotification(notificationData: any) {
  const res: Res = await axios.post(`${BASE_URL}`, notificationData);
  return res.data.success
    ? resService.handleSuccess(res)
    : resService.handleErr(res);
}

async function createForAll(notificationData: any) {
  const res: Res = await axios.post(`${BASE_URL}/all`, notificationData);
  return res.data.success
    ? resService.handleSuccess(res)
    : resService.handleErr(res);
}

async function editNotification(notification_id: number, formData: any) {
  const res: Res = await axios.put(`${BASE_URL}/${notification_id}`, formData);
  return res.data.success
    ? resService.handleSuccess(res)
    : resService.handleErr(res);
}

async function deleteNotification(notification_id: any) {
  const res: Res = await axios.delete(`${BASE_URL}/${notification_id}`);
  if (res.data.success) {
    Swal.fire("Deleted!", "Your message has been deleted.", "success");
  }
  return res.data.success
    ? resService.handleSuccess(res)
    : resService.handleErr(res);
}
