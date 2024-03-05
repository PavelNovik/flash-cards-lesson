import { Button } from '@/components/ui/button'

export type PaginationProps = {
  currentPage: number
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: number) => void
  pageSize: number
}

export const Pagination = ({
  currentPage,
  onPageChange,
  onPageSizeChange,
  pageSize,
}: PaginationProps) => {
  return (
    <div style={{ display: 'flex', gap: '10px', marginTop: '50px' }}>
      <Button disabled={currentPage <= 1} onClick={() => onPageChange(currentPage - 1)}>
        Previous page
      </Button>
      <select
        defaultValue={10}
        name={'pages'}
        onChange={e => onPageSizeChange(+e.currentTarget.value)}
        style={{ backgroundColor: 'black' }}
      >
        <option value={5}>5</option>
        <option value={7}>7</option>
        <option value={10}>10</option>
      </select>
      {pageSize}
      <Button onClick={() => onPageChange(currentPage + 1)}>Next page</Button>
    </div>
  )
}
