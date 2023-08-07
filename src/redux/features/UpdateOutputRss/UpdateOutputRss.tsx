import { createSlice } from '@reduxjs/toolkit';
type updateRssDataTypes = {
  updateRssCategories: [];
  // updatesocialServiceName: string;
  updatesocialServiceId: string;
  // updatelanguageValue: string;
  updatelanguageId: string;
  updatePublishedType: string;
  updatepublishedTypeExplanation: string;
};
const initialState: updateRssDataTypes = {
  updateRssCategories: [],
  // updatesocialServiceName: '',
  updatesocialServiceId: '',
  // updatelanguageValue: '',
  updatelanguageId: '',
  updatePublishedType: '',
  updatepublishedTypeExplanation: ''
};

export const UpdateOutpuptRssSlic = createSlice({
  name: 'getUpdateOutputRssDataSlice',
  initialState,
  reducers: {
    setUpdateOutputRssData: (state, action) => {
      state.updateRssCategories = action.payload.updateRssCategories;
      // state.updatesocialServiceName = action.payload.updatesocialServiceName;
      state.updatesocialServiceId = action.payload.updatesocialServiceId;
      // state.updatelanguageValue = action.payload.updatelanguageValue;
      state.updatelanguageId = action.payload.updatelanguageId;
      state.updatePublishedType = action.payload.updatePublishedType;
      state.updatepublishedTypeExplanation = action.payload.updatepublishedTypeExplanation;
    }
  }
});

export const { setUpdateOutputRssData } = UpdateOutpuptRssSlic.actions;
export default UpdateOutpuptRssSlic.reducer;
