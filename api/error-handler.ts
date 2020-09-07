import RequestErrorCodes from '~/assets/js/glossary/request-error-codes.json'
import { ErrorConfig, ErrorHandler } from '~/types'

const defaultConfig: ErrorConfig = {
  returnValue: [],
  errorsList: [
    {
      statuses: [
        RequestErrorCodes.FORBIDDEN,
        RequestErrorCodes.UNAUTHORIZED,
        RequestErrorCodes.NOT_FOUND
      ],
      return: (e: any) => { return { error: e.response.status } }
    },
    {
      statuses: [
        RequestErrorCodes.NOT_ACCEPTABLE,
        RequestErrorCodes.BAD_REQUEST
      ],
      return: (e: any) => e.response.data
    }
  ]
}

const HttpErrorHandler = (error: any, config: ErrorConfig = {}) => {
  const localConfig: ErrorConfig = { ...defaultConfig, ...config }

  try {
    if (error && localConfig.errorsList) {
      const status = error.response.status
      const handler: ErrorHandler | undefined = localConfig.errorsList.find(el => el.statuses.includes(status))
      if (handler) {
        return handler.return(error)
      }
    }

    return localConfig.returnValue
  } catch (e) {
    return localConfig.returnValue
  }
}

export default HttpErrorHandler
