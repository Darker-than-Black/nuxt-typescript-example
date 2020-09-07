import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import VueTestInstance from '~/test/factory/vue-instance'
import EntryJournalListPage from '~/pages/journal/index.vue'
import EntryJournalListModule from '~/store/entry-journal/list'
import EntryJournalListMock from '~/test/api/entry-journal-list.json'
import { TableConfig, EntryJournalUser } from '~/types'

describe('page entry journal list', () => {
  let wrapper: any
  const router = new VueRouter()
  const serverConfig: TableConfig = {
    size: EntryJournalListMock.size,
    totalElements: EntryJournalListMock.totalElements,
    totalPages: EntryJournalListMock.totalPages,
    number: EntryJournalListMock.number
  }

  beforeEach(() => {
    wrapper = VueTestInstance(EntryJournalListPage, {
      isShallow: false,
      modules: [BootstrapVue, VueRouter],
      storeModules: {
        'entry-journal/list': {
          namespaced: true,
          state: {
            ...EntryJournalListModule.state,
            serverConfig
          },
          mutations: EntryJournalListModule.mutations,
          actions: EntryJournalListModule.actions
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

  describe('test function: "getUserName"', () => {
    it('without params', () => {
      expect(wrapper.vm.getUserName()).toBe('—')
    })

    it('with params', () => {
      const user: EntryJournalUser = EntryJournalListMock.content[0].driver as EntryJournalUser
      expect(wrapper.vm.getUserName(user)).toBe('John Doe Tarasovych')
    })
  })

  describe('test function: "getValue"', () => {
    it('return default value', () => {
      const defaultValue: string = 'asd'
      expect(wrapper.vm.getValue({}, 'path', defaultValue)).toBe(defaultValue)
    })

    it('return search value', () => {
      const obj = { a: { b: 'asd' } }
      expect(wrapper.vm.getValue(obj, 'a.b')).toBe(obj.a.b)
    })
  })
})
