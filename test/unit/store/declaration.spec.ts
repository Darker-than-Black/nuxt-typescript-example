import StoreInstance from '~/test/factory/store-instance'
import DeclarationModule from '~/store/declaration/declaration'
import DeclarationMock from '~/test/api/declaration-info.json'

jest.mock('~/api', () => ({ GET_DECLARATION: jest.fn(() => DeclarationMock) }))

describe('store declaration', () => {
  let store: any
  beforeEach(() => {
    store = StoreInstance(DeclarationModule)
  })

  it('check default state values', () => {
    expect(store.state.data).toEqual({})
  })

  describe('test action: "getData"', () => {
    beforeEach(() => {
      store.dispatch('getData', 'ex-id')
    })

    it('check set state "data"', () => {
      expect(store.state.data).toEqual(DeclarationMock)
    })
  })

  describe('test mutation: "cleanModule"', () => {
    beforeEach(() => {
      store.dispatch('getData', 'ex-id')
    })

    it('check state reset to default value', () => {
      store.commit('cleanModule')
      expect(store.state.data).toEqual({})
    })
  })
})
