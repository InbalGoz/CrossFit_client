import axios from 'axios';
import devConfig from '../env/dev';
import { Customer } from '../models/customer';

export const customerService = {
  getAll,
};

const BASE_URL = `${devConfig.base_url}/customers`;

async function getAll(): Promise<Customer[]> {
  const res: any = axios.get(`${BASE_URL}`);
  return res.data;
}


