import { PayloadAction, createSlice } from '@reduxjs/toolkit';
type getAllCategoriesProps = {
  id: string;
  text: string;
};
interface CategoryType {
  all_categories: getAllCategoriesProps[];
}
const initialState: CategoryType = {
  all_categories: []
};

export const categoryInputSlice = createSlice({
  name: 'get_all_categories',
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.all_categories = action.payload;
    }
  }
});
export const { setCategories } = categoryInputSlice.actions;
export default categoryInputSlice.reducer;
