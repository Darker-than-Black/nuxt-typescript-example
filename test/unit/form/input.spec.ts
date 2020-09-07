import VueTestInstance from '~/test/factory/vue-instance'
import Input from '~/components/form/input.vue'

describe('input.vue', () => {
  let wrapper: any
  beforeEach(() => {
    wrapper = VueTestInstance(Input)
  })

  it('initialize correctly', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('should match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('check input function', () => {
    const event: any = { target: { value: 'test text' } }
    expect(wrapper.vm.input(event)).toEqual(event.target.value)
  })
})
