import { useState } from 'react'

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
import { useGetDecksQuery } from '@/services/base-api'

export const DecksPages = () => {
  const [search, setSearch] = useState('')
  const { data, isError, isLoading } = useGetDecksQuery({ name: search })

  if (isLoading) {
    return <div>...Loading</div>
  }

  if (isError) {
    return <div>...Error</div>
  }

  return (
    <Container>
      <TextField label={'Search'} onChange={e => setSearch(e.currentTarget.value)} value={search} />
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
