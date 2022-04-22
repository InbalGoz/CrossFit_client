import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Employee } from '../../models/employee';

interface EmployeeSliceState {
    all_emploees: Employee[];  
    emploee:{
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
    all_emploees: [],
    emploee: {
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
  name:'emploee',
  initialState,
  reducers:{
    setEmployees( state , action:PayloadAction<Employee[]>){
        state.all_emploees = action.payload;
    },
    setEmployee( state , action:PayloadAction<Employee>){
        state.emploee = action.payload;
    },
    createEmployee(state , action){

    },
    editEmployee(state , action){
       state.emploee = action.payload;
    },
    deleteEmployee(state , action){

    }  
  }
});