import BootstrapVue from 'bootstrap-vue'
import VueTestInstance from '~/test/factory/vue-instance'
import GridWrapper from '~/components/UI/grid-wrapper.vue'

describe('grid-wrapper.vue', () => {
  const contentInLeftCol: string = '<h1>Left Col</h1>'
  const contentInRightCol: string = '<p>Right Col</p>'
  const wrapper = VueTestInstance(GridWrapper, {
    options: {
      props: { showAside: false },
      slots: { aside: contentInLeftCol, main: contentInRightCol }
    },
    modules: [BootstrapVue]
  })

  const btnToggleAside = wrapper.find('button.btn')
  const leftCol = wrapper.find('.col__left')
  const rightCol = wrapper.find('.col__right')

  it('initialize correctly', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('should match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('check emit "toggle-aside"', () => {
    btnToggleAside.trigger('click')
    expect(wrapper.emitted()['toggle-aside']).toBeTruthy()
  })

  describe('show aside (default)', () => {
    it('check prop "showAside": button for toggle visible aside, don\'t include class "rotate"', () => {
      expect(btnToggleAside.classes('rotate')).toBe(false)
    })

    it('check prop "showAside": left col don\'t include class "col__left--hide"', () => {
      expect(leftCol.classes('col__left--hide')).toBe(false)
    })

    it('check prop "showAside": right col don\'t include class "col__right--large"', () => {
      expect(rightCol.classes('col__right--large')).toBe(false)
    })
  })

  describe('hide aside', () => {
    it('check update prop "showAside"', () => {
      const showAside: boolean = true
      wrapper.setProps({ showAside })
      expect(wrapper.props().showAside).toBe(showAside)
    })

    it('check update prop "showAside": button added class "rotate"', () => {
      expect(btnToggleAside.classes('rotate')).toBe(true)
    })

    it('check prop "showAside": left col added class "col__left--hide"', () => {
      expect(leftCol.classes('col__left--hide')).toBe(true)
    })

    it('check prop "showAside": right col added class "col__right--large"', () => {
      expect(rightCol.classes('col__right--large')).toBe(true)
    })
  })

  describe('slots of components', () => {
    it('check "aside" slot of component', () => {
      expect(leftCol.find('h1').html()).toEqual(contentInLeftCol)
    })

    it('check "main" slot of component', () => {
      expect(rightCol.find('p').html()).toEqual(contentInRightCol)
    })
  })
})
