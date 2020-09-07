import VueTestInstance from '~/test/factory/vue-instance'
import BlankSubject from '~/components/blank/items/blank-subject.vue'
import DECLARATION_BLANK_ITEMS from '~/assets/js/glossary/balnk/declaration-blank-items'
import DeclarationMock from '~/test/api/declaration-info.json'

describe('blank-subject.vue', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = VueTestInstance(BlankSubject, {
      options: {
        propsData: {
          config: DECLARATION_BLANK_ITEMS[1],
          data: DeclarationMock
        }
      }
    })
  })

  it('should match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})
