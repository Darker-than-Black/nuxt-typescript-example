import VueMixinInstance from '~/test/factory/vue-mixin-instance'
import NotificationMixin from '~/mixins/notification-mixin'

describe('mixin notification-mixin', () => {
  const text: string = 'lorem ipsum'
  let wrapper: any

  beforeEach(() => {
    wrapper = VueMixinInstance({
      options: {
        mixins: [NotificationMixin],
        mocks: {
          $notify: jest.fn()
        }
      }
    })
  })

  it('initialize correctly', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  describe('test function: "message"', () => {
    it('call $notify plugin', () => {
      wrapper.vm.message(text)
      expect(wrapper.vm.$notify).toHaveBeenCalled()
    })

    it('call with default type', () => {
      wrapper.vm.message(text)
      expect(wrapper.vm.$notify).toHaveBeenCalledWith({ title: text, type: wrapper.vm.messageTypes.success })
    })

    it('check set text and type', () => {
      wrapper.vm.message(text, wrapper.vm.messageTypes.error)
      expect(wrapper.vm.$notify).toHaveBeenCalledWith({ title: text, type: wrapper.vm.messageTypes.error })
    })
  })
})
