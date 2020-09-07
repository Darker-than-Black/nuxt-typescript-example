import vClickOutside from 'v-click-outside'
import VueTestInstance from '~/test/factory/vue-instance'
import FilterMultiSelect from '~/components/filter/filter-multi-select.vue'
import MULTI_SELECT_LABELS from '~/assets/js/glossary/multi-select-labels.json'
import { SelectOption } from '~/types'

describe('filter-multi-select.vue', () => {
  let wrapper: any
  const options: SelectOption[] = [
    { value: 'val_1', text: 'Val 1' },
    { value: 'val_2', text: 'Val 2' }
  ]

  beforeEach(() => {
    wrapper = VueTestInstance(FilterMultiSelect, {
      modules: [vClickOutside],
      options: {
        propsData: {
          showOptions: true,
          label: 'Filter Select',
          value: [],
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

  it('check selected few values', () => {
    wrapper.setProps({ value: [options[0].value] })
    expect(wrapper.vm.selectLabel).toBe(MULTI_SELECT_LABELS.selective)
  })

  it('check selected all values', () => {
    wrapper.setProps({ value: options.map((el: SelectOption) => el.value) })
    expect(wrapper.vm.selectLabel).toBe(MULTI_SELECT_LABELS.all)
  })

  it('check input function', () => {
    expect(wrapper.vm.input(options[1].value)).toBe(options[1].value)
  })
})
