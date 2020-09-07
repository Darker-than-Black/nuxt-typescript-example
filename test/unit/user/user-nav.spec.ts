import { RouterLinkStub } from '@vue/test-utils'
import VueTestInstance from '~/test/factory/vue-instance'
import UserNav from '~/components/user/user-nav.vue'

describe('user-nav.vue', () => {
  const wrapper = VueTestInstance(UserNav, {
    options: {
      stubs: { NuxtLink: RouterLinkStub }
    }
  })

  it('initialize correctly', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('should match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('check emit "logout"', () => {
    wrapper.find('button.btn').trigger('click')
    expect(wrapper.emitted().logout).toBeTruthy()
  })
})
