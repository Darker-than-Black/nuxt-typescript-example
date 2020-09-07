export type TestComponentInstanceConfig = {
  options?: object,
  isShallow?: boolean,
  modules?: any[],
  storeModules?: {
    [key: string]: any
  },
  directives?: {
    [key: string]: object
  }
}
