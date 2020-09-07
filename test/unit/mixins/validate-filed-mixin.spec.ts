import VueMixinInstance from '~/test/factory/vue-mixin-instance'
import ValidateFieldMixin from '~/mixins/validate-filed-mixin'

describe('mixin validate-filed-mixin', () => {
  let wrapper: any
  const value: number[] = [1, 2, 3]

  beforeEach(() => {
    wrapper = VueMixinInstance({
      options: {
        mixins: [ValidateFieldMixin],
        propsData: {
          value
        }
      }
    })
  })

  it('initialize correctly', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  describe('test function: "setNewValue"', () => {
    it('don\'t set new inputValue', () => {
      wrapper.vm.setNewValue(value)
      expect(wrapper.vm.localValue).toEqual(value)
    })

    it('update inputValue', () => {
      const newValue: number[] = [22, 33]
      wrapper.vm.setNewValue(newValue)
      expect(wrapper.vm.localValue).toEqual(newValue)
    })
  })

  it('check emit: "input"', () => {
    expect(wrapper.vm.input()).toEqual(value)
  })

  it('check watcher: "onLocalValue"', () => {
    wrapper.vm.setNewValue = jest.fn()
    wrapper.vm.onLocalValue(value)
    expect(wrapper.vm.setNewValue).toHaveBeenCalled()
  })
})
