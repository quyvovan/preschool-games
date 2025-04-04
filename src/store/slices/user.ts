import { RootState } from '..';
import { IUserPermission } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

export interface IStoreUserInfo {
  id: number;
  email: string | null;
  username: string;
  isOwner: boolean;
  fullName?: string;
  permissions: IUserPermission[];
}

interface IUserState {
  userInfo: IStoreUserInfo;
}

export const NON_LOGIN_USER_ID = 9999;

const INITIAL_STATE: IUserState = {
  userInfo: {
    id: NON_LOGIN_USER_ID,
    email: '',
    username: '',
    permissions: [],
    isOwner: true,
  },
};

const USER_REDUCER_NAME = 'user';

export const userSlice = createSlice({
  name: USER_REDUCER_NAME,
  initialState: INITIAL_STATE,
  reducers: {
    resetState: () => {
      return INITIAL_STATE;
    },
    setUserInfo: (state, { payload }: { payload: IStoreUserInfo }) => {
      state.userInfo = payload;
    },
  },
});

const getUser = (state: RootState) => state[USER_REDUCER_NAME].userInfo;

export const userSelectors = {
  getUser,
};

export const userActions = userSlice.actions;
