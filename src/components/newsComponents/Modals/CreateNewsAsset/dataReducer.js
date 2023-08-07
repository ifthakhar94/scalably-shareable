export const initial_State = {
  assetName: '',
  urlValue: '',
  descriptionValue: '',
  accesibility_status: '',
  categories: [],
  rssValues: []
};

export const dataReducer = (state, action) => {
  if (action.type === 'SET_ALL_DATA_VALUES') {
    return {
      assetName: action.payload.name
    };
  }
};
