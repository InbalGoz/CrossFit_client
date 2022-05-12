import axios from "axios";
import devConfig from "../env/dev";
import { Employee } from "../models/employee";
import { resService } from "./resService";
import { Res } from "../models/res";

export const employeeService = {
  getLoggedEmployee,
  getWithLessons,
  getAll,
  createEmployee,
  editEmployee,
  deleteEmployee,
};

const BASE_URL = `${devConfig.base_url}/employees`;

async function getLoggedEmployee(employee_id: number): Promise<Employee> {
  const res: Res = await axios.get(`${BASE_URL}/${employee_id}`);

  return res.data.success
    ? resService.handleSuccess(res)
    : resService.handleErr(res);
}

async function getWithLessons(employee_id: number): Promise<Employee> {
  const res: Res = await axios.get(`${BASE_URL}/withLessons`);
  return res.data.success
    ? resService.handleSuccess(res)
    : resService.handleErr(res);
}

async function getAll(): Promise<Employee[]> {
  const res: Res = await axios.get(`${BASE_URL}`);
  return res.data.success
    ? resService.handleSuccess(res)
    : resService.handleErr(res);
}

async function createEmployee(formData: any) {
  const res: Res = await axios.post(`${BASE_URL}`, formData);
  return res.data.success
    ? resService.handleSuccess(res)
    : resService.handleErr(res);
}

async function editEmployee(employee_id: number) {
  const res: Res = await axios.put(`${BASE_URL}/${employee_id}`);
  return res.data.success
    ? resService.handleSuccess(res)
    : resService.handleErr(res);
}

async function deleteEmployee(employee_id: string) {
  const res: Res = await axios.delete(`${BASE_URL}/${employee_id}`);
  return res.data.success
    ? resService.handleSuccess(res)
    : resService.handleErr(res);
}
