import debounce from 'lodash/debounce'
import { Vue, Component, Watch } from 'nuxt-property-decorator'
import converter from '~/assets/js/utils/converter.ts'
import TYPES from '~/assets/js/glossary/types.json'
import { MultiSelectValue, QueryParam, QueryParams, QueryParamsConfig } from '~/types'

@Component
export default class RouterQueryParamsMixin extends Vue {
  public queryParamsConfig: QueryParamsConfig = {}
  public queryParams: QueryParams = {}

  @Watch('$route')
  onRoute (to: any, from: any): void {
    if (JSON.stringify(to.query) !== JSON.stringify(from.query)) {
      this.updateRoute(to.query)
    }
  }

  created (): void {
    const query: any = this.$route.query
    if (Object.keys(query).length) {
      this.updateRoute(query)
    }
  }

  destroyed (): void {
    // clean query params
    Object.entries(this.queryParamsConfig).forEach((values: [string, { defaultValue: QueryParam, type: string }]) => {
      this.queryParams[values[0]] = values[1].defaultValue
    })
  }

  private updateRoute (query: { [key: string]: string }): void {
    const localKeysList: Array<string> = Object.keys(this.queryParams)
    const routerKeysList: Array<string> = Object.keys(query)

    localKeysList.forEach((key) => {
      if (routerKeysList.includes(key)) {
        let value: QueryParam = query[key]
        if (this.queryParamsConfig[key].type === TYPES.Array) {
          value = converter.stringToArray(query[key])
        }

        if (JSON.stringify(this.queryParams[key]) !== JSON.stringify(value)) {
          this.queryParams[key] = value
        }
      } else {
        this.queryParams[key] = this.queryParamsConfig[key].defaultValue
      }
    })
  }

  private routerQueryParamsHandler (): void {
    const query: any = {}
    Object.keys(this.queryParams).forEach((el) => {
      const values: QueryParam = this.queryParams[el]

      if (values + '') {
        query[el] = values

        if (this.queryParamsConfig[el].type === TYPES.Array) {
          query[el] = converter.arrayToString(values as MultiSelectValue)
        }
      }
    })

    this.$router.push({
      path: this.$route.path,
      hash: this.$route.hash,
      query
    })
  }

  // debounce filter
  public debounceRoute = debounce(this.routerQueryParamsHandler, 300)
}
