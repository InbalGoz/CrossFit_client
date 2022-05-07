import { Res } from '../models/res';
import Swal from "sweetalert2";

export const resService = {
  handleErr,
  handleSuccess,
};

function handleErr(res: Res) {
  //pop up msg that something wromng , u can use swal alert of boostrap
  //Temporary
  //console.log("res error " , res);
  console.log({res});
  Swal.fire({ 
    icon: 'error',
    title: 'Oops...',
    text: 'hello' , 
   });
}

function handleSuccess(res: Res) {
 // console.log("res.data.data" , res.data.data)
  
  /*Swal.fire({ 
    icon: 'error',
    title: 'Oops...',
    text: 'hello' , 
   });*/
  return res.data.data;
}
