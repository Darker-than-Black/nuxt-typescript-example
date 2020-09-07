import debounce from 'lodash/debounce'
import { Component, mixins } from 'nuxt-property-decorator'
import RouterQueryParamsMixin from '~/mixins/router-query-params'
import TableNav from '~/components/UI/table-nav.vue'
import ROUTER_CONFIG from '~/assets/js/glossary/tables/router-config.json'
import SORT_TYPES from '~/assets/js/glossary/tables/sort-types.json'
import { QueryParamsConfig, QueryParams, QueryParam, TableColConfig, TableSortEvent } from '~/types'

const QUERY_PARAMS: QueryParams = {}
Object.entries(ROUTER_CONFIG).forEach((values: [string, { defaultValue: QueryParam, type: string }]) => {
  QUERY_PARAMS[values[0]] = values[1].defaultValue
})

@Component({
  components: { TableNav }
})
export default class PageTableMixin extends mixins(RouterQueryParamsMixin) {
  public fields: TableColConfig[] = []
  public queryParamsConfig: QueryParamsConfig = ROUTER_CONFIG
  public queryParams: QueryParams = QUERY_PARAMS

  get getQueryParams (): QueryParams {
    return {
      ...this.queryParams,
      page: (this.queryParams.page as number) - 1
    }
  }

  get sortBy (): string {
    try {
      return (this.queryParams.sort as string).split(',')[0]
    } catch (e) {
      return ''
    }
  }

  get sortDesc (): boolean {
    if (!this.sortBy) { return false }

    const regex: RegExp = new RegExp(SORT_TYPES.Descending)
    return regex.test(this.queryParams.sort as string)
  }

  mounted () {
    this.debounceGetData()
  }

  destroyed (): void {
    this.cleanModule()
  }

  public resetPageToFirst (): void {
    this.queryParams.page = 1
    this.updateTable()
  }

  public updateTable (): void {
    this.debounceRoute()
    this.debounceGetData()
  }

  public sorted (event: TableSortEvent) {
    const sortType: string = event.sortDesc ? ',' + SORT_TYPES.Descending : SORT_TYPES.Ascending
    this.queryParams.sort = event.sortBy + sortType
    this.resetPageToFirst()
  }

  public debounceGetData = debounce(this.httpRequest, 300)

  public httpRequest (): void {
    this.getData(this.getQueryParams)
  }

  /**
   * mocked of store mutation
   */
  public cleanModule (): void {}

  /**
   * mocked of store action
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getData (query: QueryParams): void {}
}
