import { createSlice } from '@reduxjs/toolkit';

type initialState = {
  rss: {}[];
};
const initialState: initialState = {
  rss: []
};

const rssNewSlice = createSlice({
  name: 'rssNew',
  initialState,
  reducers: {
    setRssValue: (state, action) => {
      state.rss.push(action.payload);
    },
    deleteNewRssData: (state, action) => {
      state.rss = action.payload;
    }
  }
});

export const { setRssValue, deleteNewRssData } = rssNewSlice.actions;
export default rssNewSlice.reducer;
