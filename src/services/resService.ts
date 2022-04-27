import { Res } from '../models/res';

export const resService = {
  handleErr,
  handleSuccess,
};

function handleErr(res: Res) {
  //pop up msg that something wromng , u can use swal alert of boostrap
  //Temporary
  alert("worng");
}

function handleSuccess(res: Res) {
  return res.data.data;
}
