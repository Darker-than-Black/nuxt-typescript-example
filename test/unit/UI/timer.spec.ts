import VueTestInstance from '~/test/factory/vue-instance'
import Timer from '~/components/UI/timer.vue'

describe('aside.vue', () => {
  const time: Date = new Date()
  const oneSecond: number = 1000
  let wrapper: any

  beforeEach(() => {
    wrapper = VueTestInstance(Timer, {
      options: {
        props: { time }
      }
    })
  })

  it('initialize correctly', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('should match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('check clean timer', () => {
    global.clearTimeout = jest.fn()
    wrapper.destroy()
    expect(global.clearTimeout).toHaveBeenCalledWith(wrapper.vm.timeoutFunc)
  })

  describe('test countdown()', () => {
    it('should recursive called countdown()', () => {
      // @ts-ignore
      global.setTimeout = jest.fn()
      wrapper.vm.countdown()
      expect(global.setTimeout).toHaveBeenCalledWith(wrapper.vm.countdown, oneSecond)
    })

    it('check work timer after deadline', () => {
      wrapper.setData({ deadline: time })
      wrapper.vm.countdown()
      expect(wrapper.vm.deadlineFail).toBe(true)
    })
  })
})
