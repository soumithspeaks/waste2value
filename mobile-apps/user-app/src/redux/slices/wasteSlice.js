import {createSlice} from '@reduxjs/toolkit';

const wasteSlice = createSlice({
  name: 'waste',
  initialState: {
    wasteTypes: [],
    classificationResult: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    setWasteTypes: (state, action) => {
      state.wasteTypes = action.payload;
    },
    setClassificationResult: (state, action) => {
      state.classificationResult = action.payload;
    },
  },
});

export const {setWasteTypes, setClassificationResult} = wasteSlice.actions;
export default wasteSlice.reducer;
