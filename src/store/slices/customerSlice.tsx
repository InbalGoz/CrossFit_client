import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Customer } from '../../models/customer';



interface CustomerSliceState {
 all_customers: Customer[];
 token: any;  
 customer:{
    id?: number;
    fName: string;
    lName: string;
    email: string;
    password: string;
    phone: string;
    birthday: Date | null;
    subStart: Date | null;
    subEnd: Date | null;
    //isAdmin: boolean,
    isVerified:boolean
  }; 
};

const initialState : CustomerSliceState = {
   all_customers: [],
   token: localStorage.getItem('token'),
   customer: {
    fName: '',
    lName: '',
    email:'',
    password: '',
    phone: '',
    birthday: null,
    subStart: null,
    subEnd: null,
    //isAdmin: false,
    isVerified: false
   } 
};

export const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers:{
        setCustomers( state , action:PayloadAction<Customer[]>){
            state.all_customers = action.payload;
        },
        setCustomer( state , action:PayloadAction<Customer>){
           // state.token = action.payload;
            state.customer = action.payload;
        },
        registration(state , action){
            
        // localStorage.setItem('token', action.payload.token);//added
            
        },
        login(state , action){
            //state.customer = action.payload;
        },
        logout(state , action){
            localStorage.removeItem(action.payload.token);
        },
    }
});