import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import pickupReducer from './slices/pickupSlice';
import wasteReducer from './slices/wasteSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    pickup: pickupReducer,
    waste: wasteReducer,
    user: userReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
