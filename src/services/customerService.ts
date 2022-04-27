import axios from 'axios';
import devConfig from '../env/dev';
import { Customer } from '../models/customer';
import { Res } from '../models/res';
import { resService } from './resService';

export const customerService = {
  getAll,
  getOneCustomer,
  registerCustomer,
  loginCustomer,
  deleteCustomer,
};

//const BASE_URL = `${devConfig.base_url}`;
const BASE_URL = `${devConfig.base_url}/customers`;

async function getAll(): Promise<Customer[]> {
  const res: Res = await axios.get(`${BASE_URL}`);
  return res.data.success
    ? resService.handleSuccess(res)
    : resService.handleErr(res);
}

async function getOneCustomer(customer_id: number): Promise<Customer> {
  const res: Res = await axios.get(`${BASE_URL}`);
  return res.data.success
    ? resService.handleSuccess(res)
    : resService.handleErr(res);
}


async function registerCustomer(formData: any) {
  const res: Res = await axios.post(`${BASE_URL}`, formData);
  return res.data.success
    ? resService.handleSuccess(res)
    : resService.handleErr(res);
}

/*
async function loginCustomer(formData: any) {
  const res: Res = await axios.post(`${BASE_URL}/login`,formData);
  return res.data.scucess
    ? resService.handleSucess(res)
    : resService.handleErr(res);
}
*/

async function loginCustomer(formData: any) {
  const res: Res = await axios.get(`${BASE_URL}/login`);
  return res.data.success
    ? resService.handleSuccess(res)
    : resService.handleErr(res);
}

async function deleteCustomer(customer_id: number) {
  const res: Res = await axios.delete(`${BASE_URL}`);
  return res.data.success
    ? resService.handleSuccess(res)
    : resService.handleErr(res);
}
