import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authSlice from '../features/Authentication/authSlice';
import AllCategories from '../features/CategoryInputSlice/categoryInputSlice';
import CreateRssDataSlice from '../features/CreateRssDataSlice/CreateRssDataSlice';
import gethubIdSlice from '../features/HubIdSlice/HubIdSlice';
import getLanguageTagSlice from '../features/LanguageTagSlice/LanguageTagSlice';
import getMediaHubData from '../features/MediaHubDataSlice/MediaHubDataSlice';
import newsAssetDataSlice from '../features/NewsAssetDataSlice/NewsAssetDataSlice';
import ExistingRssDataSlice from '../features/OutputRssExistingDataSlice/OutputRssExistingDataSlice';
import OutputRssHubDataSlice from '../features/OutputRssHubDataSlice/OutputRssHubDataSlice';
import NewRss from '../features/Rss/rssSlice';
import UpdateOutpuptRssSlic from '../features/UpdateOutputRss/UpdateOutputRss';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['getAssetData']
};

const reducer = combineReducers({
  get_all_categories: AllCategories,
  getHubId: gethubIdSlice,
  getLanguageTag: getLanguageTagSlice,
  getAssetData: newsAssetDataSlice,
  getAuthData: authSlice,
  getMediaHubData: getMediaHubData,
  rssNew: NewRss,
  getOutputRssHubData: OutputRssHubDataSlice,
  getCreateRssDataSlice: CreateRssDataSlice,
  getUpdateOutputRssDataSlice: UpdateOutpuptRssSlic,
  getExistingRssDataSlice: ExistingRssDataSlice
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
