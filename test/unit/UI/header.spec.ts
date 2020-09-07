import { RouterLinkStub } from '@vue/test-utils'
import BootstrapVue from 'bootstrap-vue'
import vClickOutside from 'v-click-outside'
import VueTestInstance from '~/test/factory/vue-instance'
import Header from '~/components/UI/header.vue'

describe('header.vue', () => {
  let wrapper: any
  beforeEach(() => {
    wrapper = VueTestInstance(Header, {
      modules: [BootstrapVue, vClickOutside],
      options: {
        stubs: { NuxtLink: RouterLinkStub }
      },
      isShallow: false
    })
  })

  it('initialize correctly', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('should match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('default: check hidden modal window', () => {
    expect(wrapper.find('.nav-modal').classes('show')).toBe(false)
  })

  it('check show "User Nav" modal window', async (done) => {
    wrapper.setData({ showUserNav: true })
    await wrapper.vm.$nextTick()
    expect(wrapper.findAll('.nav-modal').at(0).classes('show')).toBe(true)
    done()
  })

  it('check show "User Services" modal window', async (done) => {
    wrapper.setData({ showUserServices: true })
    await wrapper.vm.$nextTick()
    expect(wrapper.findAll('.nav-modal').at(1).classes('show')).toBe(true)
    done()
  })

  it('test "hideModals" function', () => {
    wrapper.vm.hideModals()
    expect(wrapper.vm.showUserNav).toBe(false)
    expect(wrapper.vm.showUserServices).toBe(false)
  })

  describe('test "showModal" function', () => {
    it('show "User Nav"', async (done) => {
      wrapper.vm.hideModals = jest.fn()
      wrapper.findAll('button.btn').at(1).trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.hideModals).toHaveBeenCalled()
      expect(wrapper.vm.showUserNav).toBe(true)
      expect(wrapper.vm.showUserServices).toBe(false)
      done()
    })

    it('show "User Services"', async (done) => {
      wrapper.vm.hideModals = jest.fn()
      wrapper.findAll('button.btn').at(0).trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.hideModals).toHaveBeenCalled()
      expect(wrapper.vm.showUserNav).toBe(false)
      expect(wrapper.vm.showUserServices).toBe(true)
      done()
    })
  })
})
