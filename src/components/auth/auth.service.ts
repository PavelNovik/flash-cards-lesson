import { baseApi } from '@/services/base-api'

export const authService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getMe: builder.query<any, void>({
        query: () => ({
          url: `v1/auth/me`,
        }),
      }),
    }
  },
})

export const { useGetMeQuery } = authService
