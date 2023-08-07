import { createSlice } from '@reduxjs/toolkit';
type createRssDataTypes = {
  createRssCategories: [];
  socialServiceName: string;
  socialServiceId: string;
  languageValue: string;
  languageId: string;
  PublishedType: string;
  publishedTypeExplanation: string;
};
const initialState: createRssDataTypes = {
  createRssCategories: [],
  socialServiceName: '',
  socialServiceId: '',
  languageValue: '',
  languageId: '',
  PublishedType: '',
  publishedTypeExplanation: ''
};

export const CreateRssDataSlice = createSlice({
  name: 'getCreateRssDataSlice',
  initialState,
  reducers: {
    setCreateRssData: (state, action) => {
      state.createRssCategories = action.payload.createRssCategories;
      state.socialServiceName = action.payload.socialServiceName;
      state.socialServiceId = action.payload.socialServiceId;
      state.languageValue = action.payload.languageValue;
      state.languageId = action.payload.languageId;
      state.PublishedType = action.payload.PublishedType;
      state.publishedTypeExplanation = action.payload.publishedTypeExplanation;
    }
  }
});

export const { setCreateRssData } = CreateRssDataSlice.actions;
export default CreateRssDataSlice.reducer;
