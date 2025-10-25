import {createSlice} from '@reduxjs/toolkit';

const pickupSlice = createSlice({
  name: 'pickup',
  initialState: {
    currentPickup: null,
    pickupHistory: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setCurrentPickup: (state, action) => {
      state.currentPickup = action.payload;
    },
    clearCurrentPickup: state => {
      state.currentPickup = null;
    },
  },
});

export const {setCurrentPickup, clearCurrentPickup} = pickupSlice.actions;
export default pickupSlice.reducer;
