export type Decks = {
  items: Deck[]
  pagination: DecksPagination
}

export type Deck = {
  author: DeckAuthor
  cardsCount: number
  cover?: null | string
  created: string
  id: string
  isPrivate: boolean
  name: string
  updated: string
  userId: string
}
export type DeckAuthor = {
  id: string
  name: string
}

export type DecksPagination = {
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

export type CreateDeckArgs = {
  cover?: null | string
  isPrivate?: boolean
  name: string
}
export type UpdateDeckArgs = Partial<CreateDeckArgs> & { id: Deck['id'] }
