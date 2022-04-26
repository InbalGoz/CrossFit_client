import axios from 'axios';
import devConfig from '../env/dev';
import { LessonType } from '../models/lessonType';
import { resService } from './resService';

export const lessonTypeService = {
  getAll,
  getOneLessonType,
  sendlessonTypeData,
  editOneLessonType,
  deleteLessonType,
};

const BASE_URL = `${devConfig.base_url}/lessonTypes`;

async function getAll(): Promise<LessonType[]> {
  const res: any = await axios.get(`${BASE_URL}`);
  return res.data.scucess
    ? resService.handleSucess(res)
    : resService.handleErr(res);
}

async function getOneLessonType(lessonType_id: number): Promise<LessonType> {
  const res: any = axios.get(`${BASE_URL}`).then((res) => res.data);
  // return res.filter((lessonType:LessonType) => lessonType.id === lessonType_id)[0];
  return res.data.scucess
    ? resService.handleSucess(res)
    : resService.handleErr(res);
}

async function sendlessonTypeData(formData: any): Promise<void> {
  const res: any = axios.post(`${BASE_URL}`, formData);
  return res.data.scucess
    ? resService.handleSucess(res)
    : resService.handleErr(res);
}

async function editOneLessonType(lessonType_id: number, formData: any) {
  const res: any = axios.put(`${BASE_URL}`, formData);
  return res.data.scucess
    ? resService.handleSucess(res)
    : resService.handleErr(res);
}

async function deleteLessonType(lessonType_id: string) {
  const res: any = axios.delete(`${BASE_URL}`);
  return res.data.scucess
    ? resService.handleSucess(res)
    : resService.handleErr(res);
}
