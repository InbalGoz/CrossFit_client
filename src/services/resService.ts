import { Res } from '../models/res';

export const resService = {
  handleErr,
  handleSucess,
};

function handleErr(res: Res) {
  //pop up msg that something wromng , u can use swal alert of boostrap
}

function handleSucess(res: Res) {
  return res.data.data;
}
