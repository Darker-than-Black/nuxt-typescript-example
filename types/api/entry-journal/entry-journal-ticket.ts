import { EntryJournalUser, TableRowValue, HttpError } from '~/types'

export type CreateTicket = {
  documents: TableRowValue[],
  products: TableRowValue[],

  driver: EntryJournalUser,
  carrier: {
    identifier: string,
    name: string
  },
  vehicleCard: {
    plateNumber: string,
    brand: string,
    numberOfPersons: number,
    vehicleTypeId: number,
    vehicleTypeName: string
  }
}

export type CreateTicketResponse = {
  // success
  cardNumber?: string,
  // error
  code?: number,
  title?: string,
  violations?: HttpError[]
}
