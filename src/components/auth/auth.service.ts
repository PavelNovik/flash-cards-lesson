import { baseApi } from '@/services/base-api'

type LoginArgs = {
  email: string
  password: string
  rememberMe: boolean
}
export const authService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getMe: builder.query<any, void>({
        query: () => ({
          url: `v1/auth/me`,
        }),
      }),
      login: builder.mutation<void, LoginArgs>({
        query: data => ({
          body: data,
          method: 'POST',
          url: `v1/auth/login`,
        }),
      }),
    }
  },
})

export const { useGetMeQuery } = authService
