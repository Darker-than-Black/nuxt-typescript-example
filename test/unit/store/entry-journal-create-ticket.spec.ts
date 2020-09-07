import StoreInstance from '~/test/factory/store-instance'
import EntryJournalCreateTicketModule from '~/store/entry-journal/create-ticket'
import CreateTickerDataMock from '~/test/api/create-ticket-data.json'
import { CreateTicketResponse } from '~/types'

const responseSuccess: CreateTicketResponse = { cardNumber: '1234567890' }
jest.mock('~/api', () => ({ CREATE_TICKET: jest.fn(() => responseSuccess) }))

describe('store entry-journal/create-ticket', () => {
  let store: any

  beforeEach(() => {
    store = StoreInstance(EntryJournalCreateTicketModule)
  })

  it('check default state values', () => {
    expect(store.state.createTicketResponse).toEqual({})
  })

  describe('test action: "createTicket"', () => {
    beforeEach(() => {
      store.dispatch('createTicket', CreateTickerDataMock)
    })

    it('check set state "createTicketResponse"', () => {
      expect(store.state.createTicketResponse).toEqual(responseSuccess)
    })
  })

  describe('test mutation: "cleanModule"', () => {
    beforeEach(() => {
      store.dispatch('createTicket', CreateTickerDataMock)
    })

    it('check state reset to default value', () => {
      store.commit('cleanModule')
      expect(store.state.createTicketResponse).toEqual({})
    })
  })
})
