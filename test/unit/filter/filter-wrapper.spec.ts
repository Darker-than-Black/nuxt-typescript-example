import VueTestInstance from '~/test/factory/vue-instance'
import FilterWrapper from '~/components/filter/filter-wrapper.vue'

describe('filter-wrapper.vue', () => {
  const nameSlot: string = '<h1>Header</h1>'
  const slotContent: string = '<p>lorem ipsum</p>'
  let wrapper: any

  beforeEach(() => {
    wrapper = VueTestInstance(FilterWrapper, {
      isShallow: false,
      directives: {
        'click-outside': () => {}
      },
      options: {
        slots: { name: nameSlot, default: slotContent },
        props: {
          label: 'Filter Wrapper',
          showOptions: true,
          isActive: false,
          hideOptions: jest.fn()
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

  it('check emit "toggleOptionsBar"', () => {
    wrapper.find('p.filter__label').trigger('click')
    expect(wrapper.emitted()['toggle-options-bar']).toBeTruthy()
  })
})
