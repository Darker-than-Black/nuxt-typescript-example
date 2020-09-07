import Vuex from 'vuex'
import { createLocalVue, shallowMount, mount } from '@vue/test-utils'
import { TestComponentInstanceConfig } from '~/types'

const defaultConfig: TestComponentInstanceConfig = { options: {}, isShallow: true, storeModules: {}, modules: [], directives: {} }

export default function (component: any, userConfig: TestComponentInstanceConfig = defaultConfig) {
  const config: TestComponentInstanceConfig = { ...defaultConfig, ...userConfig }
  const localVue = createLocalVue()
  let store: any

  if (config.modules && config.modules.length) {
    config.modules.forEach(module => localVue.use(module))
  }

  if (config.storeModules && Object.keys(config.storeModules).length) {
    localVue.use(Vuex)

    store = new Vuex.Store({
      modules: config.storeModules
    })
  }

  if (config.directives && Object.keys(config.directives).length) {
    Object.entries(config.directives).forEach((array: [string, object]) => localVue.directive(array[0], array[1]))
  }

  if (config.isShallow) {
    return shallowMount(component, { localVue, ...config.options, store })
  }

  return mount(component, { localVue, ...config.options, store })
}
