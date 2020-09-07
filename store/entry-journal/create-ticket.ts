import { VuexModule, Module, MutationAction, Mutation } from 'vuex-module-decorators'
import { CREATE_TICKET } from '~/api'
import { CreateTicket, CreateTicketResponse } from '~/types'

@Module({
  name: 'create-ticket',
  stateFactory: true,
  namespaced: true
})
export default class EntryJournalCreateTicketModule extends VuexModule {
  public createTicketResponse: CreateTicketResponse | object = {}

  @Mutation
  public cleanModule (): void {
    this.createTicketResponse = {}
  }

  @MutationAction({ mutate: ['createTicketResponse'] })
  public async createTicket (data: CreateTicket) {
    const createTicketResponse: CreateTicketResponse = await CREATE_TICKET(data)
    return { createTicketResponse }
  }
}
