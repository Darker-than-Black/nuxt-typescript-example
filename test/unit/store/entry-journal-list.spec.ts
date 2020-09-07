import StoreInstance from '~/test/factory/store-instance'
import EntryJournalListModule from '~/store/entry-journal/list'
import EntryJournalListMock from '~/test/api/entry-journal-list.json'
import { TableConfig } from '~/types'

jest.mock('~/api', () => {
  return {
    GET_ENTRY_JOURNAL_LIST: jest.fn(() => EntryJournalListMock)
  }
})

describe('store list.ts', () => {
  let store: any
  beforeEach(() => {
    store = StoreInstance(EntryJournalListModule)
  })

  it('check default state values', () => {
    expect(store.state.data).toEqual([])
    expect(store.state.serverConfig).toEqual({})
  })

  describe('test action: "getData"', () => {
    beforeEach(() => {
      store.dispatch('getData', {})
    })

    it('check set state "data"', () => {
      expect(store.state.data.length).toEqual(EntryJournalListMock.content.length)
    })

    it('check set state "serverConfig"', () => {
      const config: TableConfig = {
        size: EntryJournalListMock.size,
        totalElements: EntryJournalListMock.totalElements,
        totalPages: EntryJournalListMock.totalPages,
        number: EntryJournalListMock.number
      }

      expect(JSON.stringify(store.state.serverConfig)).toEqual(JSON.stringify(config))
    })
  })

  describe('test mutation: "cleanModule"', () => {
    beforeEach(() => {
      store.dispatch('getData', {})
    })

    it('check state reset to default value', () => {
      store.commit('cleanModule')
      expect(store.state.data).toEqual([])
      expect(store.state.serverConfig).toEqual({})
    })
  })
})
