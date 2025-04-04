import { API_TAG } from '@/constants';
import { IUserInfo } from '@/types';
import { ResponseBase, ResponseBaseFixed } from '@/utils';
import { api } from '@/utils/api';

const apiWithTag = api.enhanceEndpoints({
  addTagTypes: [API_TAG.USERS],
});
export const usersApi = apiWithTag.injectEndpoints({
  endpoints: (build) => ({
    getUserInfo: build.query<IUserInfo, void>({
      query: () => ({
        url: `/users`,
        method: 'GET',
      }),
      transformResponse: (response: ResponseBase<IUserInfo[]>) => response.data,
      providesTags: [API_TAG.USERS],
    }),
    getUserDetail: build.query<ResponseBaseFixed<IUserInfo>, void>({
      query: () => ({
        url: `/users`,
        method: 'GET',
      }),
      providesTags: [API_TAG.USERS],
    }),
  }),
  overrideExisting: false,
});

// Export hooks for usage in functional components
export const {
  useGetUserInfoQuery,
  useGetUserDetailQuery,
  useLazyGetUserDetailQuery,
} = usersApi;
