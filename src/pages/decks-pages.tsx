import {
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table/Table'
import { useGetDecksQuery } from '@/services/base-api'

export const DecksPages = () => {
  const { data, isError, isLoading } = useGetDecksQuery()

  if (isLoading) {
    return <div>...Loading</div>
  }

  if (isError) {
    return <div>...Error</div>
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader>Name</TableHeader>
          <TableHeader>Cards</TableHeader>
          <TableHeader>Last Updated</TableHeader>
          <TableHeader>Created by</TableHeader>
          <TableHeader>Actions</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.items.map(i => (
          <TableRow key={i.id}>
            <TableData>{i.name}</TableData>
            <TableData>{i.cardsCount}</TableData>
            <TableData>{new Date(i.updated).toLocaleDateString('ru-Ru')}</TableData>
            <TableData>{i.author.name}</TableData>
            <TableData>{i.userId}</TableData>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
