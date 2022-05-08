import axios from 'axios';
import devConfig from '../env/dev';
import { Res } from '../models/res';
import { FullLesson, Lesson } from '../models/lesson';
import { resService } from './resService';

export const lessonService = {
  getAll,
  getRecommendedLessons,
  getFullInfoLessons,
  createLesson,
  getLesson,
  editLesson,
  deleteLesson,
};

const BASE_URL = `${devConfig.base_url}/lessons`;

async function getAll(): Promise<Lesson[]> {
  const res: Res = await axios.get(`${BASE_URL}`);
  return res.data.success
    ? resService.handleSuccess(res)
    : resService.handleErr(res);
}

async function getRecommendedLessons(userId: number): Promise<Lesson[]> {
  console.log(userId);
  const res: Res = await axios.get(`${BASE_URL}/recommended/${userId}`);
  console.log({ res });

  return res.data.success
    ? resService.handleSuccess(res)
    : resService.handleErr(res);
}

async function getFullInfoLessons(): Promise<FullLesson[]> {
  const res: Res = await axios.get(`${BASE_URL}/fullInfo`);

  console.log('serviceeee', res);
  return res.data.success
    ? resService.handleSuccess(res)
    : resService.handleErr(res);
}

async function createLesson(formData: any) {
  const res: Res = await axios.post(`${BASE_URL}`, formData);
  return res.data.success
    ? resService.handleSuccess(res)
    : resService.handleErr(res);
}

async function getLesson(lesson_id: number): Promise<Lesson> {
  const res: Res = await axios.get(`${BASE_URL}/${lesson_id}`);
  return res.data.success
    ? resService.handleSuccess(res)
    : resService.handleErr(res);
}

async function editLesson(lesson: any) {
  const res: Res = await axios.put(`${BASE_URL}/${lesson.id}`, lesson);
  return res.data.success
    ? resService.handleSuccess(res)
    : resService.handleErr(res);
}

async function deleteLesson(lesson_id: number | undefined) {
  const res: Res = await axios.delete(`${BASE_URL}/${lesson_id}`);

  return res.data.success
    ? resService.handleSuccess(res)
    : resService.handleErr(res);
}
