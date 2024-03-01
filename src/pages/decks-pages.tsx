import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container/container'
import {
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table/Table'
import { TextField } from '@/components/ui/text-field/text-field'
import {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDecksQuery,
  useGetMinMaxCardsQuery,
} from '@/services/decks/decks.service'
import { useDebounceValue } from 'usehooks-ts'

export const DecksPages = () => {
  const [search, setSearch] = useDebounceValue('', 500)
  const { data: minMaxCardData } = useGetMinMaxCardsQuery()

  console.log(minMaxCardData)
  const { data, isError, isLoading } = useGetDecksQuery(
    {
      // maxCardsCount: minMaxCardData?.max,
      // minCardsCount: minMaxCardData?.min,
      name: search,
    }
    // { skip: !minMaxCardData }
  )
  // const [fetchData, { data, isError, isLoading }] = useLazyGetDecksQuery()
  const [createDeck, { isLoading: isDeckBeingCreated }] = useCreateDeckMutation()
  const [deleteDeck, { isLoading: isDeckBeingDeleted }] = useDeleteDeckMutation()

  if (isLoading) {
    return <div>...Loading</div>
  }

  if (isError) {
    return <div>...Error</div>
  }

  return (
    <Container>
      <TextField
        defaultValue={search}
        label={'Search'}
        onChange={e => setSearch(e.currentTarget.value)}
      />
      <Button disabled={isDeckBeingCreated} onClick={() => createDeck({ name: search })}>
        Add new Deck
      </Button>
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
                <img src={i.cover ?? undefined} width={70} />
              </TableData>
              <TableData>{i.cardsCount}</TableData>
              <TableData>{new Date(i.updated).toLocaleDateString('ru-Ru')}</TableData>
              <TableData>{i.author.name}</TableData>
              <TableData>
                <Button disabled={isDeckBeingDeleted} onClick={() => deleteDeck(i.id)}>
                  Delete
                </Button>
              </TableData>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/*<Button onClick={() => fetchData({ name: search })}>Fetch Data</Button>*/}
    </Container>
  )
}
