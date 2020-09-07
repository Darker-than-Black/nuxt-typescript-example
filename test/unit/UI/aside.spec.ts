import VueTestInstance from '~/test/factory/vue-instance'
import Aside from '~/components/UI/aside.vue'

describe('aside.vue', () => {
  const navLinks: any = [
    { text: 'Загальне', icon: 'Home', path: '/' }
  ]
  const wrapper = VueTestInstance(Aside, {
    options: {
      data: () => ({ navLinks }),
      props: { simple: false }
    }
  })

  it('initialize correctly', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('should match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('check show link text', () => {
    const link = wrapper.find('.aside .aside__item:nth-child(1)')
    expect(link.find('.aside__text').text()).toBe(navLinks[0].text)
  })

  it('check path to icon', () => {
    expect(wrapper.find('.aside .aside__item img').attributes().src).toBe(`/icons/${navLinks[0].icon}.svg`)
  })

  it('check update prop "simple"', () => {
    wrapper.setProps({ simple: true })
    expect(wrapper.props().simple).toBe(true)
  })

  it('check hide link text', () => {
    expect(wrapper.find('.aside .aside__item .aside__text').classes('d-none')).toBe(true)
  })
})
