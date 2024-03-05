import { baseApi } from '@/services'
import { Auth, LoginArgs } from '@/services/auth/auth.types'

export const authService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getMe: builder.query<Auth, void>({
        providesTags: ['Me'],
        query: () => ({
          url: `v1/auth/me`,
        }),
      }),
      login: builder.mutation<void, LoginArgs>({
        invalidatesTags: ['Me'],
        query: data => ({
          body: data,
          method: 'POST',
          url: `v1/auth/login`,
        }),
      }),
    }
  },
})

export const { useGetMeQuery, useLoginMutation } = authService
