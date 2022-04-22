import { employeeSlice } from "../slices/employeeSlice";
import { AnyAction , ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Employee } from '../../models/employee';
import { employeeService } from '../../services/employeeService';

export const employeeActions = employeeSlice.actions;

export const getAllEmployees = () : ThunkAction<void,RootState,unknown,AnyAction> =>{
    return async (dispatch, getState) =>{
        const res: Employee[] = await employeeService.getAll();
        dispatch(employeeActions.setEmployees(res));
    }
  }
  
export const getEmployee = (employee_id:number) : ThunkAction<void,RootState,unknown,AnyAction> =>{
    return async (dispatch, getState) =>{
      const res: Employee = await employeeService.getOneEmployee(employee_id);
      dispatch(employeeActions.setEmployee(res))
    }
};

export const createEmployee = (formData:any) : ThunkAction<void,RootState,unknown,AnyAction> => {
    return async (dispatch,getState)=>{
      const res = await employeeService.sendEmployeeData(formData);
      dispatch(employeeActions.createEmployee(res))
    }
};

export const editEmployee = (employee_id:number , formData:any) : ThunkAction<void,RootState,unknown,AnyAction> =>{
    return async (dispatch, getState) =>{
      const res = await employeeService.editOneEmployee(employee_id, formData);
      dispatch(employeeActions.editEmployee(res))
    }
};

export const deleteEmployee = (employee_id:string) : ThunkAction<void,RootState,unknown,AnyAction> =>{
    return async (dispatch, getState) =>{
        await employeeService.deleteEmployee(employee_id);
        //dispatch(lessonActions.deleteLesson(lesson_id))
    }
};