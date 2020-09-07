import VueRouter from 'vue-router'
import VueMixinInstance from '~/test/factory/vue-mixin-instance'
import RouterQueryParamsMixin from '~/mixins/router-query-params'
import TYPES from '~/assets/js/glossary/types.json'
import { QueryParams, QueryParamsConfig } from '~/types'

describe('mixin router-query-params.ts', () => {
  let wrapper: any
  const router = new VueRouter()

  const queryParamsConfig: QueryParamsConfig = {
    testQueryString: {
      defaultValue: '',
      type: TYPES.String
    },
    testQueryArray: {
      defaultValue: [],
      type: TYPES.Array
    }
  }

  const queryParams: QueryParams = {
    testQueryString: '',
    testQueryArray: []
  }

  /**
   * It is impossible at the same time mocked $route and import VueRouter module, it's bug vue-test-utils
   */
  describe('default query params in route', () => {
    const $route: any = { name: 'index', query: { testQueryString: 'asd' } }

    beforeEach(() => {
      wrapper = VueMixinInstance({
        options: {
          mixins: [RouterQueryParamsMixin],
          router,
          data: () => ({
            queryParamsConfig,
            queryParams
          }),
          mocks: { $route }
        }
      })
    })

    it('initialize correctly', () => {
      expect(wrapper.vm).toBeTruthy()
    })

    it('check set default params with router', () => {
      expect(wrapper.vm.$route.query.testQueryString).toBe(wrapper.vm.queryParams.testQueryString)
    })

    it('test function: "updateRoute"', () => {
      $route.query = {
        testQueryString: '',
        testQueryArray: [1, 2, 3]
      }
      wrapper.vm.updateRoute($route.query)

      expect(wrapper.vm.queryParams).toEqual($route.query)
    })
  })

  describe('include VueRouter module', () => {
    beforeEach(() => {
      wrapper = VueMixinInstance({
        modules: [VueRouter],
        options: {
          mixins: [RouterQueryParamsMixin],
          router,
          data: () => ({
            queryParamsConfig,
            queryParams
          })
        }
      })
    })

    it('check work watcher on $route', () => {
      wrapper.vm.updateRoute = jest.fn()
      const from: any = { query: {} }
      const to: any = {
        query: {
          testQueryString: '',
          testQueryArray: [1, 2, 3]
        }
      }
      wrapper.vm.onRoute(to, from)
      expect(wrapper.vm.updateRoute).toHaveBeenCalled()
    })

    it('test function: "routerQueryParamsHandler"', () => {
      wrapper.vm.$router.push = jest.fn()
      wrapper.setData({
        queryParams: {
          testQueryString: '',
          testQueryArray: [1, 2, 3]
        }
      })
      wrapper.vm.routerQueryParamsHandler()
      expect(wrapper.vm.$router.push).toHaveBeenCalled()
    })

    it('check clean "queryParams", when destroy component', () => {
      wrapper.destroy()
      expect(wrapper.vm.queryParams.testQueryArray).toEqual(queryParamsConfig.testQueryArray.defaultValue)
      expect(wrapper.vm.queryParams.testQueryString).toEqual(queryParamsConfig.testQueryString.defaultValue)
    })
  })
})
