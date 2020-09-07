import BootstrapVue from 'bootstrap-vue'
import VueTestInstance from '~/test/factory/vue-instance'
import CheckboxGroup from '~/components/form/checkbox-group.vue'
import { SelectOption, MultiSelectValue } from '~/types'

describe('checkbox-group.vue', () => {
  let wrapper: any
  const options: SelectOption[] = [
    { value: 1, text: 'val 1' },
    { value: 2, text: 'val 2' },
    { value: 3, text: 'val 3' }
  ]

  beforeEach(() => {
    wrapper = VueTestInstance(CheckboxGroup, {
      modules: [BootstrapVue],
      options: {
        props: { options }
      }
    })
  })

  it('initialize correctly', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('should match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('check function: "onSelected"', () => {
    wrapper.vm.input = jest.fn()
    wrapper.setProps({ value: [] })
    wrapper.vm.onSelected([1])
    expect(wrapper.vm.input).toHaveBeenCalled()
  })

  it('check function: "onSelectedProp"', () => {
    const value: MultiSelectValue = [1, 2]
    wrapper.vm.setSelectedValue = jest.fn()
    wrapper.vm.onSelectedProp(value)
    expect(wrapper.vm.setSelectedValue).toHaveBeenCalledWith(value)
  })

  it('check input function', () => {
    const value: MultiSelectValue = [1, 2]
    wrapper.setData({ selected: value })
    expect(wrapper.vm.input()).toStrictEqual(value)
  })
})
