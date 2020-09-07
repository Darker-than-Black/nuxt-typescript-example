import VueTestInstance from '~/test/factory/vue-instance'
import NavModal from '~/components/UI/nav-modal.vue'

describe('nav-modal.vue', () => {
  const slotContent: string = '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam</p>'
  const wrapper = VueTestInstance(NavModal, {
    options: {
      slots: { default: slotContent }
    }
  })

  it('initialize correctly', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('should match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('check slot of component', () => {
    expect(wrapper.find('.nav-modal p').html()).toEqual(slotContent)
  })
})
