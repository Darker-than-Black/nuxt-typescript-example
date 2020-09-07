import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'
import VueTestInstance from '~/test/factory/vue-instance'
import IndexPage from '~/pages/index.vue'
import { QueryParam } from '~/types'

describe('page: management-table.vue', () => {
  let wrapper: any

  beforeEach(() => {
    const router = new VueRouter()

    wrapper = VueTestInstance(IndexPage, {
      modules: [BootstrapVue, VueRouter],
      options: { router }
    })

    wrapper.vm.debounceRoute = jest.fn()
  })

  it('initialize correctly', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('should match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  describe('update selected filter handler', () => {
    it('check update "queryParams"', async (done) => {
      const event: { value: QueryParam, key: string } = { value: 'Str', key: 'datalist' }
      wrapper.vm.onSelectedHandler(event)
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.queryParams[event.key]).toBe(event.value)
      done()
    })

    it('should been called update router', async (done) => {
      const event: { value: QueryParam, key: string } = { value: 'Str', key: 'datalist' }
      wrapper.vm.onSelectedHandler(event)
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.debounceRoute).toHaveBeenCalled()
      done()
    })
  })
})
