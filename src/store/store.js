import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/user.slices';

const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

export default store;