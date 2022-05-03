import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Employee } from "../../models/employee";

//authSlice  :  user : employee||customer . login, logout, register,
interface EmployeeSliceState {
  all_employees: Employee[];
  employee: Employee;
}

const initialState: EmployeeSliceState = {
  all_employees: [],
  employee: {
    id: 0,
    fName: "",
    lName: "",
    password: "",
    phone: "",
    isAdmin: false,
    lessons: [],
  },
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setEmployees(state, action: PayloadAction<Employee[]>) {
      state.all_employees = action.payload;
    },
    setEmployee(state, action: PayloadAction<Employee>) {
      state.employee = action.payload;
    },
    setEmployeeWithLessons(state, action) {
      state.employee = action.payload;
    },
    createEmployee(state, action) {
      state.all_employees = [...state.all_employees, action.payload];
    },
    editEmployee(state, action) {
      state.employee = action.payload;
    },
    deleteEmployee(state, action) {
      const newEmployeeArr = state.all_employees.filter(
        (employee) => employee.id !== action.payload
      );
      state.all_employees = newEmployeeArr;
    },
  },
});
