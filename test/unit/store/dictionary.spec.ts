import StoreInstance from '~/test/factory/store-instance'
import DictionaryModule from '~/store/dictionary'
import VehicleTypesMock from '~/test/api/vehicle-types.json'

jest.mock('~/api', () => ({ GET_VEHICLE_TYPES: jest.fn(() => VehicleTypesMock) }))

describe('store dictionary.ts', () => {
  let store: any

  beforeEach(() => {
    store = StoreInstance(DictionaryModule)
  })

  it('check default state values', () => {
    expect(store.state.vehicleTypes).toEqual([])
  })

  describe('test action: "getVehicleTypes"', () => {
    beforeEach(() => {
      store.dispatch('getVehicleTypes')
    })

    it('check set state "vehicleTypes"', () => {
      expect(store.state.vehicleTypes.length).toEqual(VehicleTypesMock.length)
    })
  })
})
