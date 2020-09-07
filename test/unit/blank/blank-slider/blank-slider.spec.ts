import VueTestInstance from '~/test/factory/vue-instance'
import BlankSlider from '~/components/blank/items/blank-slider/index.vue'
import DECLARATION_BLANK_ITEMS from '~/assets/js/glossary/balnk/declaration-blank-items'
import DeclarationMock from '~/test/api/declaration-info.json'

describe('blank-slider/index.vue', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = VueTestInstance(BlankSlider, {
      options: {
        propsData: {
          config: DECLARATION_BLANK_ITEMS[3],
          data: DeclarationMock.declaration.personResponsibleForFinancialSettlement
        }
      }
    })
  })

  it('should match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})
