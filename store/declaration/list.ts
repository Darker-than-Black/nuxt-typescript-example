import { VuexModule, Module, MutationAction, Mutation } from 'vuex-module-decorators'
import { GET_DECLARATIONS } from '~/api'
import { DeclarationsResponse, Declaration, TableConfig, QueryParams } from '~/types'

@Module({
  name: 'list',
  stateFactory: true,
  namespaced: true
})
export default class DeclarationsModule extends VuexModule {
  public data: Declaration[] = []
  public serverConfig: TableConfig = {}

  @Mutation
  public cleanModule (): void {
    this.data = []
    this.serverConfig = {}
  }

  @MutationAction({ mutate: ['data', 'serverConfig'] })
  public async getData (query: QueryParams) {
    const response: DeclarationsResponse = await GET_DECLARATIONS(query)
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
