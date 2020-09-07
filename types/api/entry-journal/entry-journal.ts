import { TableConfig } from '~/types'

export interface EntryJournalListResponse extends TableConfig {
  content: EntryJournal[]
}

export type Mark = {
  date: string,
  inspectorInfo: string,
  location: string,
  type?: string
}

export type EntryJournalUser = {
  firstName: string,
  identifier: string,
  lastName: string,
  patronym?: string
}

export interface EntryJournal {
  brand: string,
  cardNumber: string,
  type: string,
  plateNumber: string,
  carrier: {
    identifier: string,
    name: string
  },
  driver?: EntryJournalUser,
  entryMark?: Mark,
  exitMark?: Mark,
  exitPermit?: Mark,
  numberOfPersons: number
}
