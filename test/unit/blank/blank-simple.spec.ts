import VueTestInstance from '~/test/factory/vue-instance'
import BlankSimple from '~/components/blank/items/blank-simple.vue'
import DECLARATION_BLANK_ITEMS from '~/assets/js/glossary/balnk/declaration-blank-items'
import DeclarationMock from '~/test/api/declaration-info.json'

describe('blank-simple.vue', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = VueTestInstance(BlankSimple, {
      options: {
        propsData: {
          config: DECLARATION_BLANK_ITEMS[1],
          data: DeclarationMock
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
})
