import { customerSlice } from "../slices/customerSlice";
import { AnyAction , ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import  { Customer } from "../../models/customer";
import { customerService } from "../../services/customerService";
import setAuthToken from "../../utils/setAuthToken";

export const customerActions = customerSlice.actions;

export const getAllCustomers = () : ThunkAction<void,RootState,unknown,AnyAction> =>{
  return async (dispatch, getState) =>{
   // if(getState().customer.all_customers.length === 0){
      const res: Customer[] = await customerService.getAll();
      
      dispatch(customerActions.setCustomers(res))
    //}
  }
}

export const getCustomer = (customer_id:number) : ThunkAction<void,RootState,unknown,AnyAction> =>{
  return async (dispatch, getState) =>{
    const res: Customer = await customerService.getOneCustomer(customer_id);
    dispatch(customerActions.setCustomer(res))
  }
};

export const register = (formData:any) : ThunkAction<void,RootState,unknown,AnyAction> => {
  return async (dispatch,getState)=>{
    const res = await customerService.registerCustomer(formData);
    dispatch(customerActions.registration(res))
   // dispatch(loadUser());//token
  }
};

/*export const loadUser = () : ThunkAction<void,RootState,unknown,AnyAction> => {
  return async (dispatch,getState)=>{
    if(localStorage.token){
      setAuthToken(localStorage.token);
    }

    //const res = await customerService.sendCustomerData(formData);
    dispatch(customerActions.registration(res))
  }
};
*/

export const logIn = (formData:any) : ThunkAction<void,RootState,unknown,AnyAction> => {
  return async (dispatch,getState)=>{
    const res = await customerService.loginCustomer(formData);
    dispatch(customerActions.login(res))
    // dispatch(loadUser());//token
  }
};


export const logOut = () : ThunkAction<void,RootState,unknown,AnyAction> => {
  return async (dispatch,getState)=>{
   // const res = await customerService.(token);
    dispatch(customerActions.logout(null));//check 
  }
};




















