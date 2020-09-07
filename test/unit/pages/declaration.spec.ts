import get from 'lodash/get'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import VueTestInstance from '~/test/factory/vue-instance'
import DeclarationPage from '~/pages/declarations/_id.vue'
import DeclarationModule from '~/store/declaration/declaration'
import DeclarationMock from '~/test/api/declaration-info.json'

jest.mock('~/api', () => ({ GET_DECLARATION: jest.fn(() => DeclarationMock) }))

describe('pages declaration _id.vue', () => {
  let wrapper: any
  const router = new VueRouter()

  beforeEach(() => {
    wrapper = VueTestInstance(DeclarationPage, {
      isShallow: false,
      modules: [BootstrapVue, VueRouter],
      options: {
        router
      },
      storeModules: {
        'declaration/declaration': DeclarationModule
      }
    })
  })

  it('initialize correctly', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('should match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should itemStyle() return object with width param', () => {
    const config = { width: '25%' }
    expect(wrapper.vm.itemStyle(config)).toEqual(config)
  })

  describe('test getItem()', () => {
    it('check default value', () => {
      expect(wrapper.vm.getItem('asd')).toBe('')
    })

    it('check get value', () => {
      const value: string = 'declaration.clearanceTypeCode'
      expect(wrapper.vm.getItem(value)).toEqual(get(DeclarationMock, value))
    })
  })

  it('test watcher onUpdateData(): should redirect when response error', () => {
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.onUpdateData({ error: 'error message' })
    expect(wrapper.vm.$router.push).toHaveBeenCalled()
  })
})
