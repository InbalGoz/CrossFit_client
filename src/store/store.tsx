import { configureStore } from '@reduxjs/toolkit';
import { customerSlice } from '../store/slices/customerSlice';
import { lessonSlice } from '../store/slices/lessonsSlice';
import { lessonTypeSlice } from '../store/slices/lessonTypeSlice';
import { employeeSlice } from '../store/slices/employeeSlice';
import { notificationSlice } from '../store/slices/notificationSlice';


const store = configureStore({
    reducer: {
        customer:customerSlice.reducer,
        employee:employeeSlice.reducer,
        lesson: lessonSlice.reducer,
        lessonType:lessonTypeSlice.reducer,
        notification:notificationSlice.reducer,
    },
});



// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;

