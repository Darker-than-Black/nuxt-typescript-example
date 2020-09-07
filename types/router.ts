import { InputValue, MultiSelectValue } from '~/types/input'

export type QueryParam = MultiSelectValue | InputValue

export type QueryParams = {
  [key: string]: QueryParam
}

export type QueryParamsConfig = {
  [key: string]: {
    defaultValue: QueryParam,
    type: string
  }
}
