import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container/container'
import { DeckDialog } from '@/components/ui/deck-dialog/deck-dialog'
import { Pagination } from '@/components/ui/pagination/pagination'
import {
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table/Table'
import { TextField } from '@/components/ui/text-field/text-field'
import { useGetMeQuery } from '@/services/auth/auth.service'
import {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDecksQuery,
  useUpdateDeckMutation,
} from '@/services/decks/decks.service'
import { CreateDeckArgs } from '@/services/decks/decks.types'
import { useDebounceValue } from 'usehooks-ts'

import s from './deck-page.module.scss'

export const DecksPages = () => {
  const { data: me } = useGetMeQuery()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [deckToEditId, setDeckToEditId] = useState<null | string>(null)

  const showEditModal = !!deckToEditId

  const [search, setSearch] = useDebounceValue('', 500)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  // const { data: minMaxCardData } = useGetMinMaxCardsQuery()

  // console.log(minMaxCardData)
  const {
    data,
    // , isError, isLoading
  } = useGetDecksQuery(
    {
      // maxCardsCount: minMaxCardData?.max,
      currentPage: currentPage,
      itemsPerPage: pageSize,
      // minCardsCount: minMaxCardData?.min,
      name: search,
    }
    // { skip: !minMaxCardData }
  )
  // const [fetchData, { data, isError, isLoading }] = useLazyGetDecksQuery()
  const [
    createDeck,
    // , { isLoading: isDeckBeingCreated }
  ] = useCreateDeckMutation()
  const [deleteDeck, { isLoading: isDeckBeingDeleted }] = useDeleteDeckMutation()

  const [updateDeck] = useUpdateDeckMutation()
  // if (isLoading) {
  //   return <div>...Loading</div>
  // }
  //
  // if (isError) {
  //   return <div>...Error</div>
  // }

  const currentUserId = me?.id

  const deckToEdit = data?.items?.find(deck => deck.id === deckToEditId)

  return (
    <Container className={s.deckContainer}>
      <DeckDialog
        defaultValues={deckToEdit as CreateDeckArgs}
        key={deckToEditId}
        onConfirm={data => {
          if (!deckToEditId) {
            return
          }
          updateDeck({ id: deckToEditId, ...data })
        }}
        onOpenChange={() => setDeckToEditId(null)}
        open={showEditModal}
      />
      <Container className={s.formContainer}>
        <TextField
          defaultValue={search}
          label={'Search'}
          name={'search'}
          onChange={e => setSearch(e.currentTarget.value)}
        />
        {/*<Button disabled={isDeckBeingCreated} onClick={() => createDeck({ name: search })}>*/}
        {/*  Add new Deck*/}
        {/*</Button>*/}
        <Button onClick={() => setShowCreateModal(true)}>Add new Deck</Button>
        <DeckDialog
          onCancel={() => setShowCreateModal(false)}
          onConfirm={data => {
            createDeck(data)
          }}
          onOpenChange={setShowCreateModal}
          open={showCreateModal}
        />
      </Container>

      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Name</TableHeader>
            <TableHeader>Cards</TableHeader>
            <TableHeader>Last Updated</TableHeader>
            <TableHeader>Created by</TableHeader>
            <TableHeader></TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.items.map(i => (
            <TableRow key={i.id}>
              <TableData>
                {i.name}
                <img src={i.cover ?? ''} width={70} />
              </TableData>
              <TableData>{i.cardsCount}</TableData>
              <TableData>{new Date(i.updated).toLocaleDateString('ru-Ru')}</TableData>
              <TableData>{i.author.name}</TableData>
              <TableData>
                <Button
                  disabled={isDeckBeingDeleted}
                  onClick={() => deleteDeck(i.id)}
                  style={{ marginRight: '10px' }}
                >
                  Del
                </Button>
                {currentUserId === i.userId && (
                  <Button onClick={() => setDeckToEditId(i.id)}>Update</Button>
                )}
              </TableData>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
        pageSize={pageSize}
      />
      {/*<Button onClick={() => fetchData({ name: search })}>Fetch Data</Button>*/}
    </Container>
  )
}
