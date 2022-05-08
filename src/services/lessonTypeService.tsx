import axios from 'axios';
import devConfig from '../env/dev';
import { LessonType } from '../models/lessonType';
import { resService } from './resService';
import { Res } from '../models/res';

export const lessonTypeService = {
  createLessonType,
  getAll,
  getLessonType,
  editLessonType,
  deleteLessonType,
};

const BASE_URL = `${devConfig.base_url}/lessonTypes`;

async function createLessonType(formData: any) {
  const res: Res = await axios.post(`${BASE_URL}`, formData);

  return res.data.success
    ? resService.handleSuccess(res)
    : resService.handleErr(res);
}

async function getAll(): Promise<LessonType[]> {
  const res: Res = await axios.get(`${BASE_URL}`);
  return res.data.success
    ? resService.handleSuccess(res)
    : resService.handleErr(res);
}

async function getLessonType(lessonType_id: number): Promise<LessonType> {
  const res: Res = await axios.get(`${BASE_URL}`, {
    params: { lessonType_id },
  });
  return res.data.success
    ? resService.handleSuccess(res)
    : resService.handleErr(res);
}

async function editLessonType(lessonType: LessonType) {
  const res: Res = await axios.put(`${BASE_URL}/${lessonType.id}`, lessonType);
  console.log({res});
  return res.data.success
    ? resService.handleSuccess(res)
    : resService.handleErr(res);
}

async function deleteLessonType(lessonType_id: string) {
  const res: Res = await axios.delete(`${BASE_URL}/${lessonType_id}`);
  return res.data.success
    ? resService.handleSuccess(res)
    : resService.handleErr(res);
}
