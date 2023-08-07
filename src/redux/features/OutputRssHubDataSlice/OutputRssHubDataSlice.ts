import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  OutputRssData: {}
};

export const OutputRssHubDataSlice = createSlice({
  name: 'getOutputRssHubData',
  initialState,
  reducers: {
    setOutputRssHubData: (state, action) => {
      state.OutputRssData = action.payload;
    }
  }
});

export const { setOutputRssHubData } = OutputRssHubDataSlice.actions;
export default OutputRssHubDataSlice.reducer;
