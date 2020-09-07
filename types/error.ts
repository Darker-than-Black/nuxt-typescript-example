export type HttpError = {
  field: string,
  message: string
}

export type ErrorHandler = {
  statuses: Array<number>,
  return: any
}

export type ErrorConfig = {
  returnValue?: any,
  errorsList?: Array<ErrorHandler>
}

export type ErrorCode = {
  error?: number
}
