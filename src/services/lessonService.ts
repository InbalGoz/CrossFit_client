import axios from 'axios';
import devConfig from '../env/dev';
import { Res } from '../models/res';
import { Lesson } from '../models/lesson';
import { resService } from './resService';

export const lessonService = {
  getAll,
  getOneLesson,
  sendlessonData,
  editOneLesson,
  deleteLesson,
};

const BASE_URL = `${devConfig.base_url}/lessons`;

async function getAll(): Promise<Lesson[]> {
  const res: Res = await axios.get(`${BASE_URL}`)

  return res.data.success
  ? resService.handleSuccess(res)
  : resService.handleErr(res);
}

async function getOneLesson(lesson_id: number): Promise<Lesson> {
  const res: Res = await axios.get(`${BASE_URL}`);
  // return res.filter((lesson: Lesson) => lesson.id === lesson_id)[0];
  return res.data.success
    ? resService.handleSuccess(res)
    : resService.handleErr(res);
}

async function sendlessonData(formData: any): Promise<void> {
  const res: Res = await axios.post(`${BASE_URL}`, formData);
  return res.data.success
    ? resService.handleSuccess(res)
    : resService.handleErr(res);
}

async function editOneLesson(lesson_id: number, formData: any) {
  const res: Res = await axios.put(`${BASE_URL}`, formData);
  return res.data.success
    ? resService.handleSuccess(res)
    : resService.handleErr(res);
}

async function deleteLesson(lesson_id: number|undefined) {
  const res: Res = await axios.delete(`${BASE_URL}/${lesson_id}`);
  return res.data.success
    ? resService.handleSuccess(res)
    : resService.handleErr(res);
}
