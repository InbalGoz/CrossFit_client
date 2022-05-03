import axios from 'axios';
import devConfig from '../env/dev';
import { Customer } from '../models/customer';
import { Res } from '../models/res';
import { resService } from './resService';

export const customerService = {
  getLoggedUser,
  registerCustomer,
  loginCustomer,
  getById,
  getAll,
  editCustomer,
  verifyCustomer,
  deleteCustomer,
};

const BASE_URL = `${devConfig.base_url}/customers`;

async function getLoggedUser(token:any): Promise<Customer> {
  const res: Res = await axios.get(`${BASE_URL}/loggedUser`, { params: { token: token} });
  return res.data.success
    ? resService.handleSuccess(res)
    : resService.handleErr(res);
};

async function loginCustomer(formData: any) {
  const res: Res = await axios.get(`${BASE_URL}/login`, { params: { email: formData.email, password: formData.password } });
  return res.data.success
    ? resService.handleSuccess(res)
    : resService.handleErr(res);
};

async function getById(customer_id: any): Promise<Customer> {
  const res: Res = await axios.get(`${BASE_URL}/${customer_id}`);
  return res.data.success
    ? resService.handleSuccess(res)
    : resService.handleErr(res);
};

async function getAll(): Promise<Customer[]> {
  const res: Res = await axios.get(`${BASE_URL}`);
  return res.data.success
    ? resService.handleSuccess(res)
    : resService.handleErr(res);
};

async function registerCustomer(formData: any) {
  const res: Res = await axios.post(`${BASE_URL}`, formData);
  return res.data.success
    ? resService.handleSuccess(res)
    : resService.handleErr(res);
};

async function editCustomer(customer_id: any , formData: any) {
  const res: Res = await axios.put(`${BASE_URL}/${customer_id}`, formData);
  return res.data.success
    ? resService.handleSuccess(res)
    : resService.handleErr(res);
};

async function verifyCustomer(customer_id: any) {
  const res: Res = await axios.put(`${BASE_URL}/verified/${customer_id}`);
  return res.data.success
    ? resService.handleSuccess(res)
    : resService.handleErr(res);
};

async function deleteCustomer(customer_id: any) {
  const res: Res = await axios.delete(`${BASE_URL}/${customer_id}`);
  return res.data.success
    ? resService.handleSuccess(res)
    : resService.handleErr(res);
};
