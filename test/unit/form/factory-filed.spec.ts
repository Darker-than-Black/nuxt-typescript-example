import VueTestInstance from '~/test/factory/vue-instance'
import FactoryField from '~/components/form/factory-field.vue'
import CONFIG from '~/assets/js/glossary/form/create-ticker'
import ConvertFieldsConfigToDefaultValue from '~/assets/js/utils/convert-fields-config-to-default-value'
import { CreateTicket } from '~/types'

const dataDefaultValue: CreateTicket = ConvertFieldsConfigToDefaultValue(CONFIG) as CreateTicket
describe('factory-field.vue', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = VueTestInstance(FactoryField, {
      options: {
        propsData: {
          config: CONFIG.documents,
          value: dataDefaultValue.documents
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

  it('check emit: input()', () => {
    expect(wrapper.vm.input(dataDefaultValue.documents)).toEqual(dataDefaultValue.documents)
  })
})
