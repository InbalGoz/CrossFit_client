import axios from 'axios';
import devConfig from '../env/dev';
import { Lesson } from '../models/lesson';

export const customerService = {
  getAll,
};

const BASE_URL = `${devConfig.base_url}/lessons`;

async function getAll(): Promise<Lesson[]> {
  const res: any = axios.get(`${BASE_URL}`);
  return res.data;
}
