import { configureStore } from '@reduxjs/toolkit';
import { customerSlice } from '../store/slices/customerSlice';



const store = configureStore({
    reducer: {
        customer:customerSlice.reducer
    },
});



// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;



/*
import { configureStore } from '@reduxjs/toolkit';
import { applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './store/reducers';

const initialState = {};

const middleware = [thunk];
const composedEnhancer = composeWithDevTools(applyMiddleware(...middleware));

const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,  
    middleware: [...middleware],
    //middleware: composeWithDevTools(applyMiddleware(...middleware)),
});
*/