import { baseApi } from '@/services'
import {
  CreateDeckArgs,
  Deck,
  Decks,
  GetDecksArgs,
  UpdateDeckArgs,
} from '@/services/decks/decks.types'
// import { PatchCollection } from '@reduxjs/toolkit/dist/query/core/buildThunks'

export const decksService = baseApi.injectEndpoints({
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
      deleteDeck: builder.mutation<Deck, string>({
        invalidatesTags: ['Decks'],
        query: id => ({
          method: 'DELETE',
          url: `v1/decks/${id}`,
        }),
      }),
      getDecks: builder.query<Decks, GetDecksArgs | void>({
        providesTags: ['Decks'],
        query: args => ({
          params: args ?? undefined,
          url: `v2/decks`,
        }),
      }),
      getMinMaxCards: builder.query<any, void>({
        query: () => ({
          url: `v2/decks/min-max-cards`,
        }),
      }),
      updateDeck: builder.mutation<Deck, UpdateDeckArgs>({
        invalidatesTags: ['Decks'],
        async onQueryStarted({ id, ...patch }, { dispatch, getState, queryFulfilled }) {
          const arrDeck = decksService.util.selectInvalidatedBy(getState(), ['Decks'])
          // let patchResult: PatchCollection
          let patchResult: any

          arrDeck.forEach(({ originalArgs }) => {
            patchResult = dispatch(
              decksService.util.updateQueryData('getDecks', originalArgs, draft => {
                const deck = draft.items.find(deck => deck.id === id)

                if (deck) {
                  Object.assign(deck, patch)
                }
              })
            )
          })

          try {
            await queryFulfilled
          } catch {
            patchResult.undo()
          }
        },
        query: ({ id, ...body }) => ({
          body: body,
          method: 'PATCH',
          url: `v1/decks/${id}`,
        }),
      }),
    }
  },
})

export const {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDecksQuery,
  useGetMinMaxCardsQuery,
  useUpdateDeckMutation,
  // useLazyGetDecksQuery,
} = decksService
