import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import VueTestInstance from '~/test/factory/vue-instance'
import DeclarationsPage from '~/pages/declarations/index.vue'
import DeclarationsModule from '~/store/declaration/list.ts'
import DeclarationsMock from '~/test/api/declarations-list.json'
import { TableConfig } from '~/types'

describe('page declarations list', () => {
  let wrapper: any
  const router = new VueRouter()
  const serverConfig: TableConfig = {
    size: DeclarationsMock.size,
    totalElements: DeclarationsMock.totalElements,
    totalPages: DeclarationsMock.totalPages,
    number: DeclarationsMock.number
  }

  beforeEach(() => {
    wrapper = VueTestInstance(DeclarationsPage, {
      isShallow: false,
      modules: [BootstrapVue, VueRouter],
      storeModules: {
        'declaration/list': {
          namespaced: true,
          state: {
            ...DeclarationsModule.state,
            serverConfig
          },
          mutations: DeclarationsModule.mutations,
          actions: DeclarationsModule.actions
        }
      },
      options: { router }
    })

    wrapper.vm.debounceRoute = jest.fn()
  })

  it('initialize correctly', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('should match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})
