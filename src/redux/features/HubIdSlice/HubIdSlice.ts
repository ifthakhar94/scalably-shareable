import { PayloadAction, createSlice } from '@reduxjs/toolkit';
type hubIdType = {
  hubId: string;
};
const initialState: hubIdType = {
  hubId: ''
};

export const hubIdSlice = createSlice({
  name: 'getHubId',
  initialState,
  reducers: {
    setHubId: (state, action) => {
      state.hubId = action.payload;
    }
  }
});

export const { setHubId } = hubIdSlice.actions;
export default hubIdSlice.reducer;
