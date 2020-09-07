import VueRouter from 'vue-router'
import VueMixinInstance from '~/test/factory/vue-mixin-instance'
import PageTableMixin from '~/mixins/page-table-mixin.ts'
import { TableSortEvent } from '~/types'

describe('mixin page-table-mixin.ts', () => {
  let wrapper: any
  const router = new VueRouter()

  beforeEach(() => {
    wrapper = VueMixinInstance({
      modules: [VueRouter],
      options: {
        router,
        mixins: [PageTableMixin]
      }
    })
  })

  it('initialize correctly', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('test function: "updateTable"', () => {
    wrapper.vm.debounceRoute = jest.fn()
    wrapper.vm.debounceGetData = jest.fn()
    wrapper.vm.updateTable()
    expect(wrapper.vm.debounceRoute).toHaveBeenCalled()
    expect(wrapper.vm.debounceGetData).toHaveBeenCalled()
  })

  it('test function: "resetPageToFirst"', () => {
    wrapper.vm.updateTable = jest.fn()
    wrapper.setData({ queryParams: { page: 123 } })
    wrapper.vm.resetPageToFirst()
    expect(wrapper.vm.updateTable).toHaveBeenCalled()
    expect(wrapper.vm.queryParams.page).toBe(1)
  })

  it('test getter: "getQueryParams"', () => {
    const { page, size, sort }: { page: number, size: number, sort: string } = { page: 123, size: 100, sort: '' }
    wrapper.setData({ queryParams: { page, size, sort } })
    expect(wrapper.vm.getQueryParams).toEqual({ page: page - 1, size, sort })
  })

  it('check clean module, when close page', () => {
    wrapper.vm.cleanModule = jest.fn()
    wrapper.destroy()
    expect(wrapper.vm.cleanModule).toHaveBeenCalled()
  })

  it('test function: "httpRequest"', () => {
    const { page, size, sort }: { page: number, size: number, sort: string } = { page: 123, size: 100, sort: '' }
    wrapper.setData({ queryParams: { page, size, sort } })
    wrapper.vm.getData = jest.fn()
    wrapper.vm.httpRequest()
    expect(wrapper.vm.getData).toHaveBeenCalledWith({ page: page - 1, size, sort })
  })

  describe('test function: "sorted"', () => {
    const page: number = 123
    const tableSortEvent: TableSortEvent = {
      apiUrl: '',
      currentPage: page,
      filter: null,
      perPage: page - 1,
      sortBy: 'fieldName',
      sortDesc: false
    }

    it('check called function: "resetPageToFirst"', () => {
      wrapper.vm.resetPageToFirst = jest.fn()
      wrapper.vm.sorted(tableSortEvent)
      expect(wrapper.vm.resetPageToFirst).toHaveBeenCalled()
    })

    it('check set sort param, when sort type is Ascending', () => {
      wrapper.vm.sorted(tableSortEvent)
      expect(wrapper.vm.queryParams.sort).toBe(tableSortEvent.sortBy)
    })

    it('check set sort param, when sort type is Descending', () => {
      tableSortEvent.sortDesc = true
      wrapper.vm.sorted(tableSortEvent)
      expect(wrapper.vm.queryParams.sort).toBe(`${tableSortEvent.sortBy},desc`)
    })
  })

  describe('test getter: "sortBy"', () => {
    it('check empty string', () => {
      wrapper.setData({ queryParams: { sort: '' } })
      expect(wrapper.vm.sortBy).toBe('')
    })

    it('check string with data', () => {
      const sort: string = 'fieldName'
      wrapper.setData({ queryParams: { sort } })
      expect(wrapper.vm.sortBy).toBe(sort)
    })

    it('check error handler', () => {
      const sort: string[] = ['fieldName']
      wrapper.setData({ queryParams: { sort } })
      expect(wrapper.vm.sortBy).toBe('')
    })
  })

  describe('test getter: "sortDesc"', () => {
    it('check empty string', () => {
      wrapper.setData({ queryParams: { sort: '' } })
      expect(wrapper.vm.sortDesc).toBe(false)
    })

    it('check string without sort param', () => {
      const sort: string = 'fieldName'
      wrapper.setData({ queryParams: { sort } })
      expect(wrapper.vm.sortDesc).toBe(false)
    })

    it('check string with sort param', () => {
      const sort: string = 'fieldName,desc'
      wrapper.setData({ queryParams: { sort } })
      expect(wrapper.vm.sortDesc).toBe(true)
    })
  })
})
