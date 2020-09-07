export type TableConfig = {
  size?: number,
  totalElements?: number,
  totalPages?: number,
  number?: number // page number
}

// Doc: https://bootstrap-vue.org/docs/components/table#field-definition-reference
export type TableColConfig = {
  key: string,
  label: string,
  sortable: boolean,
  tdClass: string[] | string,
  thClass: string[] | string
}

export type TableSortEvent = {
  apiUrl: string,
  currentPage: number,
  filter: any
  perPage: number,
  sortBy: string
  sortDesc: boolean
}
