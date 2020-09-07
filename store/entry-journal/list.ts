import { VuexModule, Module, MutationAction, Mutation } from 'vuex-module-decorators'
import { GET_ENTRY_JOURNAL_LIST } from '~/api'
import { EntryJournal, EntryJournalListResponse, QueryParams, TableConfig } from '~/types'

@Module({
  name: 'list',
  stateFactory: true,
  namespaced: true
})
export default class EntryJournalListModule extends VuexModule {
  public data: EntryJournal[] = []
  public serverConfig: TableConfig = {}

  @Mutation
  public cleanModule (): void {
    this.data = []
    this.serverConfig = {}
  }

  @MutationAction({ mutate: ['data', 'serverConfig'] })
  public async getData (query: QueryParams) {
    const response: EntryJournalListResponse = await GET_ENTRY_JOURNAL_LIST(query)
    return {
      data: response.content,
      serverConfig: {
        size: response.size,
        totalElements: response.totalElements,
        totalPages: response.totalPages,
        number: response.number
      }
    }
  }
}
