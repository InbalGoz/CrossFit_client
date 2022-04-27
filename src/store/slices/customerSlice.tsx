import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Customer } from '../../models/customer';



interface CustomerSliceState {
 all_customers: Customer[];
 //token: any; 
 isAuthenticated: Boolean, 
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
 // customer_id:string;

};

const initialState : CustomerSliceState = {
   all_customers: [],
  // token: localStorage.getItem('token'),
   isAuthenticated: false,
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
   },
  // customer_id:'',
};

export const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers:{
        setCustomers( state , action:PayloadAction<Customer[]>){
            state.all_customers = action.payload;
        },
        setCustomer( state , action:PayloadAction<Customer>){
            console.log("customer" , action.payload)
           // state.token = action.payload;
            state.customer = action.payload;
        },
        registration(state , action){

            console.log("token", action.payload.token)
            state.customer = action.payload;
            
            localStorage.setItem('token', action.payload.token);//added
            state.isAuthenticated = true;
            
        },
        login(state , action){
            state.customer = action.payload;
            state.isAuthenticated = true;
        },
        logout(state , action){
            localStorage.removeItem('token');
            state.customer = {
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
            console.log("loggoutt")
            state.isAuthenticated = false;
        },
    }
});