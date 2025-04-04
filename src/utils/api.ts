import { axiosBaseQuery } from '@/utils/request';
import { createApi } from '@reduxjs/toolkit/dist/query/react';

export const api = createApi({
  reducerPath: 'allApi',
  baseQuery: axiosBaseQuery(),
  keepUnusedDataFor: 3 * 60, // 3 minute
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});
