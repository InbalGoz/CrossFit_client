import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Customer } from "../../models/customer";

interface CustomerSliceState {
  all_customers: Customer[];
  // customer: Customer | null;
}

const initialState: CustomerSliceState = {
  all_customers: [],
  // token: localStorage.getItem('token'),
  // isAuthenticated: false,
  // user: {
  //   //id: 0,
  //   fName: '',
  //   lName: '',
  //   email: '',
  //   password: '',
  //   phone: '',
  //   birthday: null,
  //   subStart: null,
  //   subEnd: null,
  //   isAdmin: false,
  //   isVerified: false,
  // },
  // customer: null,
  // user_type: 'string',
};

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setCustomers(state, action: PayloadAction<Customer[]>) {
      state.all_customers = action.payload;
    },
    // getCustomer(state, action: PayloadAction<Customer>) {
    //  state.customer = action.payload;
    // },
    setLoggedCustomer(state, action) {
      // console.log('user slice', action.payload);
      // state.user_type = action.payload.type;
      // state.user = action.payload.user;
      // state.isAuthenticated = true;
    },
    // setCustomerById(state, action: PayloadAction<Customer>) {
    //   state.customer = action.payload;
    //   state.isAuthenticated = true;
    // },
    verifyCustomer(state, action: PayloadAction<Customer>) {
      const copy = [...state.all_customers];
      console.log(action.payload);
      const idx = copy.findIndex((c) => c.id === action.payload.id);
      if (idx !== -1) {
        copy.splice(idx, 1, action.payload);
        console.log({ copy, idx });
        state.all_customers = copy;
      }
    },
    // registration(state, action) {
    //   if (state.user_type === 'customer') {
    //     state.customer = action.payload.customer;

    //     state.all_customers = [...state.all_customers, action.payload];
    //   }
    //   localStorage.setItem('token', action.payload.token); //adde
    //   state.isAuthenticated = true;
    // },
    login(state, action) {
      console.log("all_customers action.payload", action.payload);

      state.all_customers = [...state.all_customers, action.payload];

      //state.customer = action.payload.customer;

      // state.isAuthenticated = true;
    },
    // updateCustomer(state, action) {
    //   state.customer = action.payload.customer;
    //   state.isAuthenticated = true;
    // },
    deleteCustomer(state, action) {
      localStorage.removeItem("token");

      const newCustomerArr = state.all_customers.filter(
        (c) => c.id !== action.payload
      );
      state.all_customers = newCustomerArr;

      // state.isAuthenticated = false;
    },
    /* logout(state, action) {
      localStorage.removeItem('token');

      const newCustomerArr = state.all_customers.filter(
        (c) => c.id !== action.payload
      );

      state.all_customers = newCustomerArr;
      // console.log("loggoutt");
      // state.isAuthenticated = false;
    },*/
  },
});
