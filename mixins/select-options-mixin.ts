import { Vue, Component, namespace } from 'nuxt-property-decorator'
import SELECT_OPTIONS_MOCKS from '~/assets/js/mocks/select-mocks.json'
import { SelectOption, VehicleType } from '~/types'

const dictionary = namespace('dictionary')

@Component
export default class SelectOptionsMixin extends Vue {
  @dictionary.State vehicleTypes!: VehicleType[]

  get optionsKeys (): { [key: string]: SelectOption[] } {
    return {
      ...SELECT_OPTIONS_MOCKS,
      vehicleType: this.optionsVehicleTypes
    }
  }

  get optionsVehicleTypes (): SelectOption[] {
    return this.vehicleTypes.map((el: VehicleType) => ({ value: el.name, text: el.name } as SelectOption))
  }

  @dictionary.Action getVehicleTypes!: () => void

  /**
   * get all dictionaries
   */
  public getDictionaries (): void {
    if (!this.vehicleTypes.length) {
      this.getVehicleTypes()
    }
  }
}
