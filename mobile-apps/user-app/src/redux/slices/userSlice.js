import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: null,
    wallet: null,
    addresses: [],
    dashboard: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setWallet: (state, action) => {
      state.wallet = action.payload;
    },
    setAddresses: (state, action) => {
      state.addresses = action.payload;
    },
  },
});

export const {setProfile, setWallet, setAddresses} = userSlice.actions;
export default userSlice.reducer;
