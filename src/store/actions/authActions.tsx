import { customerSlice } from "../slices/customerSlice";
import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Customer } from "../../models/customer";
import { customerService } from "../../services/customerService";
import { authSlice } from "../slices/authSlice";
import { Employee } from "../../models/employee";
import { authService } from "../../services/authService";

export const customerActions = customerSlice.actions;
export const authActions = authSlice.actions;

export const getLoggedUser = (
  token: any
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const res: { user: Customer | Employee; type: string } =
      await authService.getLoggedUser(token);
    if (res) dispatch(authActions.setUser(res));
  };
};

// export const getCustomerById = (
//   customer_id: any
// ): ThunkAction<void, RootState, unknown, AnyAction> => {
//   return async (dispatch, getState) => {
//     const res: Customer = await customerService.getById(customer_id);
//     dispatch(customerActions.setCustomerById(res));
//   };
// };

export const register = (
  formData: any
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const res = await customerService.registerCustomer(formData);

    if (!res) {
      //console.log('not registerd');
    } else {
      dispatch(authActions.registration(res));
    }
    // dispatch(loadUser());//token
  };
};

export const logIn = (
  formData: any
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const res: { token: string; user: Customer | Employee; type: string } =
      await authService.login(formData);
    //console.log({ res });
    localStorage.setItem("token", res.token);
    dispatch(authSlice.actions.setUser(res));
  };
};

export const getAllCustomers = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatch, getState) => {
    // if(getState().customer.all_customers.length === 0){
    const res: Customer[] = await customerService.getAll();
    dispatch(customerActions.setCustomers(res));
    //}
  };
};

// export const editCustomer = (
//   customer_id: number,
//   formData: any
// ): ThunkAction<void, RootState, unknown, AnyAction> => {
//   return async (dispatch, getState) => {
//     const res = await customerService.editCustomer(customer_id, formData);
//     dispatch(customerActions.updateCustomer(res)); //check
//   };
// };

export const verifyCustomer = (
  customer_id: number
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const res: { customer: Customer } = await customerService.verifyCustomer(
      customer_id
    );
    dispatch(customerActions.verifyCustomer(res.customer));
  };
};

export const deleteCustomer = (
  customer_id: number
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const res = await customerService.deleteCustomer(customer_id);
    dispatch(customerActions.deleteCustomer(res)); //check
  };
};

export const logOut = (): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    // const res = await customerService.(token);
    dispatch(authActions.logout()); //check
  };
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
