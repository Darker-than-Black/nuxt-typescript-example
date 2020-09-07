import { VuexModule, Module, MutationAction } from 'vuex-module-decorators'
import { GET_VEHICLE_TYPES } from '~/api'
import { VehicleType } from '~/types'

@Module({
  name: 'dictionary',
  stateFactory: true,
  namespaced: true
})
export default class DictionaryModule extends VuexModule {
  public vehicleTypes: VehicleType[] = []

  @MutationAction({ mutate: ['vehicleTypes'] })
  public async getVehicleTypes () {
    const vehicleTypes: VehicleType[] = await GET_VEHICLE_TYPES()
    return { vehicleTypes }
  }
}
