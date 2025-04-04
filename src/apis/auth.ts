import { IAuth } from '@/types';
import { ILoginRequest } from '@/types/user';
import { ResponseBase, ResponseBaseFixed } from '@/utils';
import { api } from '@/utils/api';

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<ResponseBaseFixed<IAuth>, ILoginRequest>({
      query: (data) => {
        return {
          url: `/guest/users/login`,
          method: 'POST',
          data,
        };
      },
    }),
    verifyUsername: build.mutation<ResponseBase<boolean>, string>({
      query: (userName: string) => ({
        url: `/guest/users/verify-username`,
        method: 'POST',
        data: { user_name: userName },
      }),
    }),
  }),
  overrideExisting: false,
});

// Export hooks for usage in functional components
export const { useLoginMutation, useVerifyUsernameMutation } = authApi;
