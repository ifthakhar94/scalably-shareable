import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  AllMediaHubData: []
};

export const mediaHubDataSlice = createSlice({
  name: 'getMediaHubData',
  initialState,
  reducers: {
    setMediaHubData: (state, action) => {
      state.AllMediaHubData = action.payload;
    }
  }
});

export const { setMediaHubData } = mediaHubDataSlice.actions;
export default mediaHubDataSlice.reducer;
