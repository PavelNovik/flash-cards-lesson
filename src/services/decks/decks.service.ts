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
        async onQueryStarted(_, { dispatch, getState, queryFulfilled }) {
          const result = await queryFulfilled
          const arrDeck = decksService.util.selectInvalidatedBy(getState(), ['Decks'])

          arrDeck.forEach(({ originalArgs }) => {
            dispatch(
              decksService.util.updateQueryData('getDecks', originalArgs, draft => {
                draft.items.unshift(result.data)
              })
            )
          })
        },
        query: body => {
          const formData = new FormData()

          if (body.cover) {
            formData.append('cover', body.cover)
            formData.append('isPrivate', String(body.isPrivate))
            formData.append('name', body.name)
          }

          return {
            body: formData,
            method: 'POST',
            url: `v1/decks`,
          }
        },
      }),
      deleteDeck: builder.mutation<Deck, string>({
        invalidatesTags: ['Decks'],
        async onQueryStarted(id, { dispatch, getState, queryFulfilled }) {
          const arrDeck = decksService.util.selectInvalidatedBy(getState(), ['Decks'])
          // let patchResult: PatchCollection
          let patchResult: any

          arrDeck.forEach(({ originalArgs }) => {
            patchResult = dispatch(
              decksService.util.updateQueryData('getDecks', originalArgs, draft => {
                const index = draft.items.findIndex(deck => deck.id === id)

                if (index !== -1) {
                  draft.items.splice(index, 1)
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
