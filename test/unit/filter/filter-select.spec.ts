import vClickOutside from 'v-click-outside'
import VueTestInstance from '~/test/factory/vue-instance'
import FilterSelect from '~/components/filter/filter-select.vue'
import { SelectOption } from '~/types'

describe('filter-select.vue', () => {
  let wrapper: any
  const options: SelectOption[] = [
    { value: 'val_1', text: 'Val 1' },
    { value: 'val_2', text: 'Val 2' }
  ]

  beforeEach(() => {
    wrapper = VueTestInstance(FilterSelect, {
      isShallow: false,
      modules: [vClickOutside],
      options: {
        propsData: {
          showOptions: true,
          label: 'Filter Select',
          value: '',
          options
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

  it('check emit input value', () => {
    wrapper.findAll('li.filter__item').at(0).trigger('click')
    expect(wrapper.emitted().input).toEqual([[options[0].value, options[0].value]])
  })

  it('check input function', () => {
    expect(wrapper.vm.input(options[1].value)).toBe(options[1].value)
  })

  it('check input function, when input value === prop value', () => {
    wrapper.setProps({ value: options[1].value })
    expect(wrapper.vm.input(options[1].value)).toBe('')
  })
})
