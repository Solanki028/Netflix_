import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isLoading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
    },
    setUser: (state, action) => {
      state.user = action.payload; // Add setUser action
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload; // Add setLoading action
    },
  },
});

export const { loginUser, logoutUser, setUser, setLoading } = userSlice.actions; // Export actions
export default userSlice.reducer;
