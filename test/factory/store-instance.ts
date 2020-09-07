import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import cloneDeep from 'lodash/cloneDeep'

export default function (module: any) {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  return new Vuex.Store(cloneDeep(module))
}
