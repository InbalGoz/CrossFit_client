import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Employee } from '../../models/employee';

interface EmployeeSliceState {
    all_employees: Employee[];  
    employee:{
        id?: number;
        fName: string;
        lName: string;
        password: string;
        phone: string;
        isAdmin: boolean;
        lessons?: any[];
     }; 
};
   
const initialState : EmployeeSliceState = {
    all_employees: [],
    employee: {
        id: 0,
        fName: '',
        lName: '',
        password: '',
        phone: '',
        isAdmin: false,
        lessons: [],
    } 
};

export const employeeSlice = createSlice({
  name:'employee',
  initialState,
  reducers:{
    setEmployees( state , action:PayloadAction<Employee[]>){
        state.all_employees = action.payload;
    },
    setEmployee( state , action:PayloadAction<Employee>){
        state.employee = action.payload;
    },
    setEmployeeWithLessons(state , action:PayloadAction<Employee>){
        state.employee = action.payload;
    },
    createEmployee(state , action){
        state.employee = action.payload;
    },
    editEmployee(state , action){
       state.employee = action.payload;
    },
    deleteEmployee(state , action){
        state.employee = {
            id: 0,
            fName: '',
            lName: '',
            password: '',
            phone: '',
            isAdmin: false,
            lessons: [],
        };
    }  
  }
});