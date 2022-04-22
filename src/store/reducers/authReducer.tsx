import {
    REGISTER_SUCCESS,
    LOGIN_SUCCESS,
    LOGOUT,
} from '../actions/types';

const initialState = {
   // token: localStorage.getItem('token'),
    //isAuthenticated: null,
    //loading: true,
    user: null
};

const authReducer = (state = initialState, action:any) =>{
    const { type, payload , user } = action;

    switch (type){
        case REGISTER_SUCCESS:
            return{
                ...state,
               // ...payload,
                user: user
            }
        default:
            return state;
    }
};

export default authReducer;