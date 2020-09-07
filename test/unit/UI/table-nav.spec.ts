import BootstrapVue from 'bootstrap-vue'
import VueTestInstance from '~/test/factory/vue-instance'
import TableNav from '~/components/UI/table-nav.vue'
import DeclarationsMock from '~/test/api/declarations-list.json'

describe('table-nav.vue', () => {
  let wrapper: any
  beforeEach(() => {
    wrapper = VueTestInstance(TableNav, {
      isShallow: false,
      modules: [BootstrapVue],
      options: {
        propsData: {
          queryParams: {},
          config: {
            size: DeclarationsMock.size,
            totalElements: DeclarationsMock.totalElements,
            totalPages: DeclarationsMock.totalPages,
            number: DeclarationsMock.number
          }
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

  it('check emit: "updateTable"', async (done) => {
    const btn = wrapper.findAll('.pagination li button.page-link').at(4)
    btn.trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('update-table')).toBeTruthy()
    done()
  })

  it('check emit: "updateSizeElementOfPage"', async (done) => {
    const btn = wrapper.findAll('.radiobtn-group__btn input').at(1)
    btn.trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('update-size-element-of-page')).toBeTruthy()
    done()
  })
})
