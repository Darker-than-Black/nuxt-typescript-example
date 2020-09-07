import vClickOutside from 'v-click-outside'
import VueTestInstance from '~/test/factory/vue-instance'
import FilterDatalist from '~/components/filter/filter-datalist.vue'

describe('filter-select.vue', () => {
  let wrapper: any
  const options: string[] = ['asd', 'lorem', 'ipsum']

  beforeEach(() => {
    wrapper = VueTestInstance(FilterDatalist, {
      isShallow: false,
      modules: [vClickOutside],
      options: {
        propsData: {
          showOptions: true,
          label: 'Filter Select',
          listLink: 'linkToDataLink',
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

  it('check input function', () => {
    expect(wrapper.vm.input(options[1])).toBe(options[1])
  })
})
