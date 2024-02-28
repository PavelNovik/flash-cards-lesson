import { useState } from 'react'

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
import { useCreateDeckMutation, useGetDecksQuery } from '@/services/base-api'

export const DecksPages = () => {
  const [search, setSearch] = useState('')
  const { data, isError, isLoading, refetch } = useGetDecksQuery({ name: search })
  const [createDeck, { isLoading: isDeckBeingCreated }] = useCreateDeckMutation()

  if (isLoading) {
    return <div>...Loading</div>
  }

  if (isError) {
    return <div>...Error</div>
  }

  return (
    <Container>
      <TextField label={'Search'} onChange={e => setSearch(e.currentTarget.value)} value={search} />
      <Button onClick={() => createDeck({ name: search }).finally(refetch)}>Add new Deck</Button>
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
              <TableData>{i.userId}</TableData>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  )
}
