import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Customer } from "../../models/customer";
import { Employee } from "../../models/employee";

interface UserSliceState {
  all_users: any[];
  isAuthenticated: Boolean;
  user: Customer | Employee | null;
  user_type: string;
}

const initialState: UserSliceState = {
  all_users: [],
  // token: localStorage.getItem('token'),
  isAuthenticated: false,
  user: null,
  user_type: "",
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      //  console.log({ action });
      state.user = action.payload.user;
      state.user_type = action.payload.type;
      state.isAuthenticated = true;
    },
    getLoggedUser(state, action) {
      //  console.log('user slice', action.payload);
      state.user_type = action.payload.type;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    registration(state, action) {
      state.user = action.payload.user;
      state.all_users = [...state.all_users, action.payload]; //check

      localStorage.setItem("token", action.payload.token); //adde
      state.isAuthenticated = true;
    },
    login(state, action) {
      localStorage.setItem("token", action.payload.token);
      state.all_users = [...state.all_users, action.payload];
      state.isAuthenticated = true;
    },
    logout(state) {
      localStorage.removeItem("token");
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});
