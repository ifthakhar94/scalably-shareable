import { createSlice } from '@reduxjs/toolkit';
type existingRssDataTypes = {
  existingRssCategories: [];
  existingdescription: string;
  existingexport_type: string;
  existinglanguage_id: string;
  existingoutput_rss_id: string;
  existingplatform_icon: string;
  existingplatform_id: string;
  existingrss_url: string;
};
const initialState: existingRssDataTypes = {
  existingRssCategories: [],
  existingdescription: '',
  existingexport_type: '',
  existinglanguage_id: '',
  existingoutput_rss_id: '',
  existingplatform_icon: '',
  existingplatform_id: '',
  existingrss_url: ''
};

export const ExistingRssDataSlice = createSlice({
  name: 'getExistingRssDataSlice',
  initialState,
  reducers: {
    setExistingOutputRssData: (state, action) => {
      state.existingRssCategories = action.payload.existingRssCategories;
      state.existingdescription = action.payload.existingdescription;
      state.existingexport_type = action.payload.existingexport_type;
      state.existinglanguage_id = action.payload.existinglanguage_id;
      state.existingoutput_rss_id = action.payload.existingoutput_rss_id;
      state.existingplatform_icon = action.payload.existingplatform_icon;
      state.existingplatform_id = action.payload.existingplatform_id;
      state.existingrss_url = action.payload.existingrss_url;
    }
  }
});

export const { setExistingOutputRssData } = ExistingRssDataSlice.actions;
export default ExistingRssDataSlice.reducer;
