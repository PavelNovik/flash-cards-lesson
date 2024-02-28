export type DecksResponse = {
  items: DecksResponseItem[]
  pagination: DecksResponsePagination
}

export type DecksResponseItem = {
  author: DecksResponseItemAuthor
  cardsCount: number
  cover?: null | string
  created: string
  id: string
  isPrivate: boolean
  name: string
  updated: string
  userId: string
}
export type DecksResponseItemAuthor = {
  id: string
  name: string
}

export type DecksResponsePagination = {
  currentPage: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
}

export type GetDecksArgs = {
  authorId?: string
  currentPage?: number
  itemsPerPage?: number
  maxCardsCount?: number
  minCardsCount?: number
  name?: string
  orderBy?: string
}
