import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
type newsAssetData = {
  name: string;
  url: string;
  description: string;
  accessibility: string;
  categoryarray: [];
  rss: string[];
};
const initialState: newsAssetData = {
  name: '',
  url: '',
  description: '',
  accessibility: 'EVERYONE',
  categoryarray: [],
  rss: []
};

export const newsAssetDataSlice = createSlice({
  name: 'getAssetData',
  initialState,
  reducers: {
    setNewsData: (state, action) => {
      state.name = action.payload.name;
      state.url = action.payload.urlValue;
      state.description = action.payload.description;
      state.accessibility = action.payload.accessibility;
      state.categoryarray = action.payload.categories;
      //   state.languageOption = action.payload.option;
    },
    settingRssValue: (state, action) => {
      if (action.payload) {
        state.rss.push(action.payload);
      } else {
        toast.error('※必須入力');
      }
    },
    deleteRssData: (state, action) => {
      state.rss = action.payload;
    }
  }
});

export const { setNewsData, settingRssValue, deleteRssData } = newsAssetDataSlice.actions;
export default newsAssetDataSlice.reducer;
