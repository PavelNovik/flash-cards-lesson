import { CreateDeckArgs, Deck, Decks, GetDecksArgs } from '@/services/decks/decks.types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.flashcards.andrii.es',
    credentials: 'include',
    prepareHeaders: headers => {
      headers.append('x-auth-skip', 'true')
    },
  }),
  endpoints: builder => {
    return {
      createDeck: builder.mutation<Deck, CreateDeckArgs>({
        invalidatesTags: ['Decks'],
        query: body => ({
          body,
          method: 'POST',
          url: `v1/decks`,
        }),
      }),
      getDecks: builder.query<Decks, GetDecksArgs | void>({
        providesTags: ['Decks'],
        query: args => ({
          params: args ?? undefined,
          url: `v2/decks`,
        }),
      }),
    }
  },
  reducerPath: 'baseApi',
  tagTypes: ['Decks'],
})

export const { useCreateDeckMutation, useGetDecksQuery } = baseApi
