import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import imageReducer from './imageSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    images: imageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
