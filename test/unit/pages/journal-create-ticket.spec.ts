import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import VueTestInstance from '~/test/factory/vue-instance'
import CreateTicketPage from '~/pages/journal/create-ticket.vue'
import EntryJournalCreateTicketModule from '~/store/entry-journal/create-ticket'
import DictionaryModule from '~/store/dictionary'
import ConvertFieldsConfigToDefaultValue from '~/assets/js/utils/convert-fields-config-to-default-value'
import CONFIG from '~/assets/js/glossary/form/create-ticker'
import LINKS from '~/assets/js/glossary/links.json'
import VehicleTypesMock from '~/test/api/vehicle-types.json'
import { CreateTicket, CreateTicketResponse, VehicleType } from '~/types'

const dataDefaultValue: CreateTicket = ConvertFieldsConfigToDefaultValue(CONFIG) as CreateTicket

jest.mock('~/api', () => ({ GET_VEHICLE_TYPES: jest.fn(() => VehicleTypesMock) }))

describe('create-ticket.vue', () => {
  let wrapper: any
  const router = new VueRouter()

  beforeEach(() => {
    wrapper = VueTestInstance(CreateTicketPage, {
      modules: [BootstrapVue],
      storeModules: {
        'entry-journal/create-ticket': EntryJournalCreateTicketModule,
        dictionary: DictionaryModule
      },
      options: {
        router,
        stubs: { ValidationObserver: { template: '<div><slot /></div>' } },
        mocks: {
          $router: { push: jest.fn() }
        }
      }
    })
  })

  it('initialize correctly', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('should match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should call getDictionaries() when created', () => {
    expect(wrapper.vm.vehicleTypes).toEqual(VehicleTypesMock)
  })

  describe('test function: onSubmit()', () => {
    it('success validation', async (done) => {
      wrapper.vm.createTicket = jest.fn()
      wrapper.vm.$refs.form.validate = jest.fn(() => {
        return new Promise((resolve: any) => {
          resolve(true)
        })
      })

      wrapper.vm.onSubmit()
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.createTicket).toHaveBeenCalled()
      done()
    })

    it('fail validation', async (done) => {
      wrapper.vm.createTicket = jest.fn()
      wrapper.vm.$refs.form.validate = jest.fn(() => {
        return new Promise((resolve: any) => {
          resolve(false)
        })
      })

      wrapper.vm.onSubmit()
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.createTicket).not.toHaveBeenCalled()
      done()
    })
  })

  it('check clean module, when close page', () => {
    wrapper.vm.cleanModule = jest.fn()
    wrapper.destroy()
    expect(wrapper.vm.cleanModule).toHaveBeenCalled()
  })

  it('test function: onUpdateProductsCount()', () => {
    wrapper.setData({ data: { ...wrapper.vm.data, products: [{ number: '123' }, { number: '123' }] } })
    wrapper.vm.onUpdateProductsCount()
    expect(wrapper.vm.data.products).toEqual(dataDefaultValue.products)
  })

  describe('test function: onUpdateVehicleType()', () => {
    it('unknown type name', () => {
      wrapper.vm.onUpdateVehicleType('asd')
      expect(wrapper.vm.data.vehicleCard.vehicleTypeId).toBe(dataDefaultValue.vehicleCard.vehicleTypeId)
    })

    it('known type name', () => {
      const type: VehicleType = wrapper.vm.vehicleTypes[0]
      wrapper.vm.onUpdateVehicleType(type.name)
      expect(wrapper.vm.data.vehicleCard.vehicleTypeId).toBe(type.id)
    })
  })

  describe('test function: onUpdateResponse()', () => {
    const responseSuccess: CreateTicketResponse = { cardNumber: '1234567890' }
    const responseError: CreateTicketResponse = {
      code: 400,
      title: 'Validate Error',
      violations: [
        { field: 'products', message: 'Fields is required' }
      ]
    }

    it('success created ticket', () => {
      wrapper.vm.message = jest.fn()
      wrapper.vm.onUpdateResponse(responseSuccess)
      expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ path: LINKS.journal.path })
      expect(wrapper.vm.message).toHaveBeenCalled()
    })

    it('fail created ticker', () => {
      wrapper.vm.$refs.form.setErrors = jest.fn()
      wrapper.vm.onUpdateResponse(responseError)
      expect(wrapper.vm.$refs.form.setErrors).toHaveBeenCalled()
    })

    it('another server response', () => {
      wrapper.vm.message = jest.fn()
      wrapper.vm.$refs.form.setErrors = jest.fn()
      wrapper.vm.onUpdateResponse({})
      expect(wrapper.vm.$refs.form.setErrors).not.toHaveBeenCalled()
      expect(wrapper.vm.$router.push).not.toHaveBeenCalled()
      expect(wrapper.vm.message).not.toHaveBeenCalled()
    })
  })
})
