import 'jest-localstorage-mock'
import { RouterLinkStub } from '@vue/test-utils'
import BootstrapVue from 'bootstrap-vue'
import Notifications from 'vue-notification'
import vClickOutside from 'v-click-outside'
import VueTestInstance from '~/test/factory/vue-instance'
import DefaultLayout from '~/layouts/default.vue'

describe('layout default.vue', () => {
  const Nuxt = { template: '<p>Nuxt Pages</p>' }
  let wrapper: any

  beforeEach(() => {
    wrapper = VueTestInstance(DefaultLayout, {
      modules: [BootstrapVue, vClickOutside, Notifications],
      options: {
        stubs: { Nuxt }
      }
    })
  })

  it('initialize correctly', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('should match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('check set prop "show-aside"', () => {
    expect(wrapper.find('grid-wrapper-stub').attributes().showaside).toBe('true')
  })

  it('check toggle aside', () => {
    const value: boolean = wrapper.vm.showShortNav
    wrapper.vm.toggleVisibleNav()
    expect(wrapper.vm.showShortNav).toBe(!value)
  })

  it('check update LocalStorage', () => {
    expect(localStorage.setItem).not.toHaveBeenLastCalledWith(wrapper.vm.localStorageVar, wrapper.vm.showShortNav)
    expect(localStorage.__STORE__[wrapper.vm.localStorageVar]).toBe(`${wrapper.vm.showShortNav}`)
  })
})
