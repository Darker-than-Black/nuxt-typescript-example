import VueTestInstance from '~/test/factory/vue-instance'
import SliderNav from '~/components/blank/items/blank-slider/slider-nav.vue'

describe('slider-nav.vue', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = VueTestInstance(SliderNav, {
      options: {
        propsData: {
          sliderSize: 10
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

  it('should emit input() return current slide', () => {
    expect(wrapper.vm.input()).toBe(wrapper.vm.currentSlide)
  })

  it('test nextSlide()', () => {
    wrapper.vm.input = jest.fn()
    wrapper.vm.nextSlide()
    expect(wrapper.vm.input).toHaveBeenCalled()
    expect(wrapper.vm.currentSlide).toBe(2)
  })

  it('test prevSlide()', () => {
    wrapper.vm.input = jest.fn()
    wrapper.vm.nextSlide()
    wrapper.vm.prevSlide()
    expect(wrapper.vm.input).toHaveBeenCalled()
    expect(wrapper.vm.currentSlide).toBe(1)
  })
})
