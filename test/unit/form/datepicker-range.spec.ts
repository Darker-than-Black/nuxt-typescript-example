import DatePicker from 'vue2-datepicker'
import VueTestInstance from '~/test/factory/vue-instance'
import DatepickerRange from '~/components/form/datepicker-range.vue'

describe('datepicker-range.vue', () => {
  let wrapper: any
  beforeEach(() => {
    wrapper = VueTestInstance(DatepickerRange, {
      isShallow: false,
      modules: [DatePicker],
      options: {
        props: {
          value: []
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

  it('check input function', () => {
    const date: string[] = ['19.07.20', '20.08.20']
    expect(wrapper.vm.input(date)).toEqual(date)
  })
})
