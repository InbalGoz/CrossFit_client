import axios from 'axios';
import devConfig from '../env/dev';
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
  const res: any = axios.get(`${BASE_URL}`).then((res) => res.data);
  return res;
}

async function getOneLesson(lesson_id: number): Promise<Lesson> {
  const res: any = await axios.get(`${BASE_URL}`);
  // return res.filter((lesson: Lesson) => lesson.id === lesson_id)[0];
  return res.data.scucess
    ? resService.handleSucess(res)
    : resService.handleErr(res);
}

async function sendlessonData(formData: any): Promise<void> {
  const res: any = await axios.post(`${BASE_URL}`, formData);
  return res.data.scucess
    ? resService.handleSucess(res)
    : resService.handleErr(res);
}

async function editOneLesson(lesson_id: number, formData: any) {
  const res: any = await axios.put(`${BASE_URL}`, formData);
  return res.data.scucess
    ? resService.handleSucess(res)
    : resService.handleErr(res);
}

async function deleteLesson(lesson_id: string) {
  const res: any = axios.delete(`${BASE_URL}`);
  return res.data.scucess
    ? resService.handleSucess(res)
    : resService.handleErr(res);
}
