import { IError } from '@/utils';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// import { APP_RUNNING_PROCESS_TYPE } from '@/utils/appRunningProcess';

interface IAppState {
  apiError: IError;
  isExpiredToken: boolean;
}

const initialState: IAppState = {
  apiError: {},
  isExpiredToken: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setApiError: (state, { payload }: PayloadAction<IError>) => {
      state.apiError = payload;
    },
    clearApiError: (state) => {
      state.apiError = {};
    },
    setExpiredToken: (state, { payload }: PayloadAction<boolean>) => {
      state.isExpiredToken = payload;
    },
  },
});

export const { setApiError, clearApiError, setExpiredToken } = appSlice.actions;
