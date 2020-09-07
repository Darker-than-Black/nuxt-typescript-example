import Vue from 'vue'
import Moment from 'moment'
import VueTestInstance from '~/test/factory/vue-instance'
import DateIntervalView from '~/components/UI/date-interval-view.vue'

describe('date-interval-view.vue', () => {
  let wrapper: any
  const dateFrom: string = '2020-07-16T13:04:33.376Z'
  beforeEach(() => {
    Vue.prototype.$moment = Moment
    wrapper = VueTestInstance(DateIntervalView, {
      options: {
        propsData: {
          dateFrom,
          dateTo: ''
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

  it('check format date', () => {
    expect(wrapper.text()).toContain(Moment(dateFrom).format('MM.DD.YYYY h:mm'))
  })

  it('check set hyphen, when date prop empty', () => {
    expect(wrapper.text()).toContain('—')
  })
})
