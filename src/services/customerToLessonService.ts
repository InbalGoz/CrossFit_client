import axios from 'axios';
import devConfig from '../env/dev';
import { CustomerToLesson } from '../models/customerToLesson';
import { Res } from '../models/res';
import { resService } from './resService';


export const customerToLessonService = {
    getAll,
    createCTL,
    getById,
    deleteCTL,
};

const BASE_URL = `${devConfig.base_url}/customersToLessons`;

async function getAll(): Promise<CustomerToLesson[]> {
    const res: Res = await axios.get(`${BASE_URL}`);
    return res.data.success
      ? resService.handleSuccess(res)
      : resService.handleErr(res);
};

async function createCTL(data: any) {
    const res: Res = await axios.post(`${BASE_URL}`, data);

    console.log("res create ctl" , res)
    return res.data.success
      ? resService.handleSuccess(res)
      : resService.handleErr(res);
};

//data - lesson id + customer id
async function getById(data: any): Promise<CustomerToLesson> {
    const res: Res = await axios.get(`${BASE_URL}/${data.lessonId}/${data.customerId}`);
    return res.data.success
      ? resService.handleSuccess(res)
      : resService.handleErr(res);
};

async function deleteCTL(data: any) {
    const res: Res = await axios.delete(`${BASE_URL}/${data.lessonId}/${data.customerId}`);
    return res.data.success
      ? resService.handleSuccess(res)
      : resService.handleErr(res);
};