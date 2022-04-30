import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Customer } from "../../models/customer";

interface CustomerSliceState {
  all_customers: Customer[];
  isAuthenticated: Boolean;
  user: {
    id?: number;
    fName: string;
    lName: string;
    email: string;
    password: string;
    phone: string;
    birthday: Date | null;
    subStart: Date | null;
    subEnd: Date | null;
    isAdmin: boolean;
    isVerified: boolean;

    // type: string;
  };
  customer: {
    id?: number;
    fName: string;
    lName: string;
    email: string;
    password: string;
    phone: string;
    birthday: Date | null;
    subStart: Date | null;
    subEnd: Date | null;
    isAdmin: boolean;
    isVerified: boolean;
  };
}

const initialState: CustomerSliceState = {
  all_customers: [],
  // token: localStorage.getItem('token'),
  isAuthenticated: false,
  user: {
    fName: "",
    lName: "",
    email: "",
    password: "",
    phone: "",
    birthday: null,
    subStart: null,
    subEnd: null,
    isAdmin: false,
    isVerified: false,

    // type: "",
  },
  customer: {
    fName: "",
    lName: "",
    email: "",
    password: "",
    phone: "",
    birthday: null,
    subStart: null,
    subEnd: null,
    isAdmin: false,
    isVerified: false,
  },
};

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setCustomers(state, action: PayloadAction<Customer[]>) {
      state.all_customers = action.payload;
    },
    setLoggedCustomer(state, action: PayloadAction<Customer>) {
      console.log("set customer", action.payload);
      //state.user = action.payload;
      //state.customer = action.payload;
      state.user = action.payload;
      console.log(" user", state.user);
    },
    setCustomerById(state, action: PayloadAction<Customer>) {
      // console.log("set customer" , action.payload)
      // state.token = action.payload;
      state.customer = action.payload;
    },
    verifyCustomer(state, action: PayloadAction<Customer>) {
      state.customer = action.payload;
    },
    registration(state, action) {
      state.customer = action.payload.customer;
      localStorage.setItem("token", action.payload.token); //added
      state.isAuthenticated = true;
    },
    login(state, action) {
      // console.log("customer", action.payload.customer)
      localStorage.setItem("token", action.payload.token);
      state.customer = action.payload.customer;
      state.isAuthenticated = true;
    },
    updateCustomer(state, action) {
      state.customer = action.payload.customer;
    },
    deleteCustomer(state, action) {
      localStorage.removeItem("token");
      state.customer = {
        fName: "",
        lName: "",
        email: "",
        password: "",
        phone: "",
        birthday: null,
        subStart: null,
        subEnd: null,
        isAdmin: false,
        isVerified: false,
      };
      state.isAuthenticated = false;
    },
    logout(state, action) {
      localStorage.removeItem("token");
      state.customer = {
        fName: "",
        lName: "",
        email: "",
        password: "",
        phone: "",
        birthday: null,
        subStart: null,
        subEnd: null,
        isAdmin: false,
        isVerified: false,
      };
      console.log("loggoutt");
      state.isAuthenticated = false;
    },
  },
});
