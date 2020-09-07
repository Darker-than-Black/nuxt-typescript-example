import StoreInstance from '~/test/factory/store-instance'
import DeclarationsModule from '~/store/declaration/list.ts'
import DeclarationsMock from '~/test/api/declarations-list.json'
import { TableConfig } from '~/types'

jest.mock('~/api', () => ({ GET_DECLARATIONS: jest.fn(() => DeclarationsMock) }))

describe('store declaration list.ts', () => {
  let store: any
  beforeEach(() => {
    store = StoreInstance(DeclarationsModule)
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
      expect(store.state.data.length).toEqual(DeclarationsMock.content.length)
    })

    it('check set state "serverConfig"', () => {
      const config: TableConfig = {
        size: DeclarationsMock.size,
        totalElements: DeclarationsMock.totalElements,
        totalPages: DeclarationsMock.totalPages,
        number: DeclarationsMock.number
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
