import VueMixinInstance from '~/test/factory/vue-mixin-instance'
import SelectOptionsMixin from '~/mixins/select-options-mixin'
import DictionaryModule from '~/store/dictionary'
import VehicleTypesMock from '~/test/api/vehicle-types.json'

jest.mock('~/api', () => ({ GET_VEHICLE_TYPES: jest.fn(() => VehicleTypesMock) }))

describe('mixin select-options-mixin', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = VueMixinInstance({
      isShallow: false,
      options: { mixins: [SelectOptionsMixin] },
      storeModules: {
        dictionary: {
          ...DictionaryModule,
          state: { vehicleTypes: VehicleTypesMock }
        }
      }
    })
  })

  it('initialize correctly', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  describe('test function: "getDictionaries"', () => {
    it('get items the first time you run the program', () => {
      wrapper = VueMixinInstance({
        isShallow: false,
        options: { mixins: [SelectOptionsMixin] },
        storeModules: {
          dictionary: DictionaryModule
        }
      })
      wrapper.vm.getVehicleTypes = jest.fn()
      wrapper.vm.getDictionaries()
      expect(wrapper.vm.getVehicleTypes).toHaveBeenCalled()
    })

    it('don\'t get items, because dictionary element have data', () => {
      wrapper.vm.getVehicleTypes = jest.fn()
      wrapper.vm.getDictionaries()
      expect(wrapper.vm.getVehicleTypes).not.toHaveBeenCalled()
    })
  })

  it('test getter: "optionsVehicleTypes"', () => {
    expect(!!wrapper.vm.optionsVehicleTypes[0].value).toBe(true)
    expect(!!wrapper.vm.optionsVehicleTypes[0].text).toBe(true)
    expect(!!wrapper.vm.optionsVehicleTypes[0].name).toBe(false)
  })

  it('test getter: "optionsKeys"', () => {
    expect(!!wrapper.vm.optionsKeys.vehicleType.length).toBe(true)
  })
})
