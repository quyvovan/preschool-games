import { appSlice } from './slices/app';
import { userSlice } from './slices/user';
import { api } from '@/utils/api';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  app: appSlice.reducer,
  user: userSlice.reducer,
});

export default rootReducer;
