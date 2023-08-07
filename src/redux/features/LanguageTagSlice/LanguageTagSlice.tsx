import { PayloadAction, createSlice } from '@reduxjs/toolkit';
type languageTag = {
  languageCode: string;
  languageOption: String;
};
const initialState: languageTag = {
  languageCode: 'ja',
  languageOption: '日本語'
};

export const languageTagSlice = createSlice({
  name: 'getLanguageTag',
  initialState,
  reducers: {
    setLanguageTag: (state, action) => {
      state.languageCode = action.payload.code;
      state.languageOption = action.payload.option;
    }
  }
});

export const { setLanguageTag } = languageTagSlice.actions;
export default languageTagSlice.reducer;
