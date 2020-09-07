import { VuexModule, Module, MutationAction, Mutation } from 'vuex-module-decorators'
import { GET_DECLARATION } from '~/api'
import { Declaration } from '~/types'

@Module({
  name: 'declaration',
  stateFactory: true,
  namespaced: true
})
export default class DeclarationModule extends VuexModule {
  public data: Declaration | {} = {}

  @Mutation
  public cleanModule (): void {
    this.data = {}
  }

  @MutationAction({ mutate: ['data'] })
  public async getData (id: string) {
    const data: Declaration = await GET_DECLARATION(id)
    return { data }
  }
}
