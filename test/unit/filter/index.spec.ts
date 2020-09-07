import vClickOutside from 'v-click-outside'
import BootstrapVue from 'bootstrap-vue'
import VueTestInstance from '~/test/factory/vue-instance'
import ExtendedOfFilters from '~/components/filter/index.vue'

describe('filter/management-table.vue', () => {
  let wrapper: any
  const value: any = {
    select: '',
    multiSelect: [],
    datalist: '',
    dateRange: []
  }

  beforeEach(() => {
    wrapper = VueTestInstance(ExtendedOfFilters, {
      modules: [BootstrapVue, vClickOutside],
      options: {
        propsData: { value }
      }
    })
  })

  it('initialize correctly', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('should match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('check input function', () => {
    const { value, key }: { value: any, key: string } = { value: 'asd', key: 'key' }
    expect(wrapper.vm.input(value, key)).toEqual({ value, key })
  })
})
