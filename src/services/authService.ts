import axios from 'axios';
import devConfig from '../env/dev';
import { Customer } from '../models/customer';
import { Employee } from '../models/employee';
import { Res } from '../models/res';
import { resService } from './resService';

export const authService = {
  getLoggedUser,
  login,
};

const BASE_URL = `${devConfig.base_url}/auth`;

async function getLoggedUser(
  token: any
): Promise<{ user: Customer | Employee; type: string }> {
  const res: Res = await axios.get(`${BASE_URL}/loggedUser`, {
    params: { token: token },
  });

  return res.data.success
    ? resService.handleSuccess(res)
    : resService.handleErr(res);
}

async function login(formData: any) {
  //console.log({ formData });

  const res: Res = await axios.get(`${BASE_URL}/login`, {
    params: {
      email: formData.email,
      password: formData.password,
      type: formData.type,
    },
  });
  return res.data.success
    ? resService.handleSuccess(res)
    : resService.handleErr(res);
}
