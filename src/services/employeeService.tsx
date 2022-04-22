import axios from 'axios';
import devConfig from '../env/dev';
import { Employee } from '../models/employee';

export const employeeService = {
  getAll,
  getOneEmployee,
  sendEmployeeData,
  editOneEmployee,
  deleteEmployee
};

const BASE_URL = `${devConfig.base_url}/employees`;

async function getAll(): Promise<Employee[]> {
  const res: any = axios.get(`${BASE_URL}`).then((res)=>  res.data);
  return res;
};

async function getOneEmployee(employee_id: number): Promise<Employee> {
  const res: any = axios.get(`${BASE_URL}`).then((res)=>  res.data);
  return res.filter((employee:Employee) => employee.id === employee_id)[0];
};

async function sendEmployeeData(formData:any): Promise<void>{
  const res: any = axios.post(`${BASE_URL}`, formData)
};

async function editOneEmployee(employee_id: number , formData:any) {
  const res: any = axios.put(`${BASE_URL}` , formData);

};

async function deleteEmployee(employee_id: string) {
  const res: any = axios.delete(`${BASE_URL}`);
};