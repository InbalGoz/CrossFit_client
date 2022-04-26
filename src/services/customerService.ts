import axios from 'axios';
import devConfig from '../env/dev';
import { Customer } from '../models/customer';

export const customerService = {
  getAll,
  getOneCustomer,
  sendCustomerData,
  deleteCustomer,
};

//const BASE_URL = `${devConfig.base_url}`;
const BASE_URL = `${devConfig.base_url}/customers`;

async function getAll(): Promise<Customer[]> {
  const res: any = axios.get(`${BASE_URL}`).then((res)=>  res.data);
  console.log("res",res)
  return res;
};

async function getOneCustomer(customer_id: number): Promise<Customer> {
  const res: any = axios.get(`${BASE_URL}`).then((res)=>  res.data);
  return res.filter((customer:Customer) => customer.id === customer_id)[0];
};

async function sendCustomerData(formData:any): Promise<void>{
  const res: any = axios.post(`${BASE_URL}`, formData)
};

async function deleteCustomer(customer_id: number) {
  const res: any = axios.delete(`${BASE_URL}`)
};


