<template>
  <b-container fluid>
    <b-row>
      <b-col cols="3" class="mt-5">
        <b-row>
          <b-col cols="12">
            <div class="icon">
              +
            </div>
          </b-col>

          <b-col cols="12">
            <h1 class="title mt-3">
              {{ links.journal.subLinks['create-ticket'].text }}
            </h1>
          </b-col>

          <b-col cols="12">
            <p class="ticket__text">
              Nec diam ut in ipsum adipiscing pulvinar consequat tempus lectus. Sit a sagittis viverra consectetur aenean hac scelerisque mauris. Sollicitudin venenatis dui pretium lacus at blandit enim rutrum.
            </p>
          </b-col>

          <b-col cols="12">
            <div class="notification success">
              <div class="notification__content">
                Позначені* поля обов’язкові для заповнення
              </div>
            </div>
          </b-col>
        </b-row>
      </b-col>

      <b-col cols="7">
        <ValidationObserver ref="form" tag="div" class="ticket">
          <form class="container-fluid p-0" @submit="onSubmit">
            <b-row>
              <b-col cols="12">
                <management-table
                  v-model="data.documents"
                  :config="config.documents"
                />
              </b-col>
            </b-row>

            <b-row class="mt-4">
              <b-col cols="11" class="d-flex align-items-center justify-content-between">
                <checkbox
                  v-model="hasAllProducts"
                  label="Всі товари з документу"
                />

                <button
                  :class="{ 'disable invisible' : !hasAllProducts }"
                  class="btn btn-transparent white-space-nowrap"
                  type="button"
                  @click="hasAllProducts = false"
                >
                  Вказати номер товару <b>+</b>
                </button>
              </b-col>

              <b-col v-show="!hasAllProducts" cols="12">
                <management-table
                  v-model="data.products"
                  :config="config.products"
                />
              </b-col>
            </b-row>

            <b-row
              v-for="(keyFirstLevel, index) in Object.keys(factoryConfig)"
              :key="index"
              class="mt-4"
            >
              <template v-if="!factoryConfig[keyFirstLevel].invisible">
                <b-col v-if="!factoryConfig[keyFirstLevel].fields" cols="11">
                  <factory-field
                    v-model="data[keyFirstLevel]"
                    :config="config[keyFirstLevel]"
                  />
                </b-col>

                <template v-else>
                  <b-col
                    v-for="(keySecondLevel, index2) in Object.keys(config[keyFirstLevel].fields)"
                    :key="index2"
                    cols="11"
                  >
                    <factory-field
                      v-if="!config[keyFirstLevel].fields[keySecondLevel].invisible"
                      v-model="data[keyFirstLevel][keySecondLevel]"
                      :config="config[keyFirstLevel].fields[keySecondLevel]"
                    />
                  </b-col>
                </template>
              </template>
            </b-row>

            <b-row class="mt-4">
              <b-col cols="11" class="text-right">
                <nuxt-link :to="links.journal.path" class="btn btn-gray mr-2">
                  Скасувати
                </nuxt-link>

                <button
                  class="btn btn-blue"
                  type="submit"
                  @click.prevent="onSubmit"
                >
                  Створити талон
                </button>
              </b-col>
            </b-row>
          </form>
        </ValidationObserver>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import cloneDeep from 'lodash/cloneDeep'
import { Component, Watch, namespace, mixins } from 'nuxt-property-decorator'
import NotificationMixin from '~/mixins/notification-mixin'
import SelectOptionsMixin from '~/mixins/select-options-mixin'
import ManagementTable from '~/components/form/management-table.vue'
import Checkbox from '~/components/form/checkbox.vue'
import FactoryField from '~/components/form/factory-field.vue'
import ConvertFieldsConfigToDefaultValue from '~/assets/js/utils/convert-fields-config-to-default-value'
import CONFIG from '~/assets/js/glossary/form/create-ticker'
import LINKS from '~/assets/js/glossary/links.json'
import INFO_TEXTS from '~/assets/js/glossary/info-texts.json'
import { CreateTicket, Links, IFactoryFieldsConfig, CreateTicketResponse, HttpError, VehicleType } from '~/types'

const ticket = namespace('entry-journal/create-ticket')
const dataDefaultValue: CreateTicket = ConvertFieldsConfigToDefaultValue(CONFIG) as CreateTicket

@Component({
  components: { ManagementTable, Checkbox, FactoryField }
})
export default class CreateTicketPage extends mixins(SelectOptionsMixin, NotificationMixin) {
  public $refs!: { form: HTMLFormElement }
  public links: Links
  public hasAllProducts: boolean
  public config: IFactoryFieldsConfig
  public factoryConfig: IFactoryFieldsConfig
  public data: CreateTicket

  constructor () {
    super()
    this.links = LINKS
    this.hasAllProducts = true
    this.config = CONFIG
    this.data = cloneDeep(dataDefaultValue)

    this.factoryConfig = {
      driver: CONFIG.driver,
      vehicleCard: CONFIG.vehicleCard,
      carrier: CONFIG.carrier
    }
  }

  @ticket.State createTicketResponse!: CreateTicketResponse

  @Watch('hasAllProducts')
  private onUpdateProductsCount (): void {
    this.data.products = dataDefaultValue.products
  }

  @Watch('data.vehicleCard.vehicleTypeName')
  private onUpdateVehicleType (newValue: string): void {
    const type: VehicleType | undefined = this.vehicleTypes.find((type: VehicleType) => type.name === newValue)
    if (type) {
      this.data.vehicleCard.vehicleTypeId = type.id
    }
  }

  @Watch('createTicketResponse')
  private onUpdateResponse (newValue: CreateTicketResponse): void {
    if (newValue.violations) {
      const errors: { [key: string]: string } = {}
      newValue.violations.forEach((row: HttpError) => {
        errors[row.field] = row.message
      })

      this.$refs.form.setErrors(errors)
    } else if (newValue.cardNumber) {
      this.$router.push({ path: this.links.journal.path })
      this.message(INFO_TEXTS.success.createTicket)
    }
  }

  created (): void {
    this.getDictionaries()
  }

  destroyed (): void {
    this.cleanModule()
  }

  @ticket.Mutation cleanModule!: () => void
  @ticket.Action createTicket!: (data: CreateTicket) => void

  public onSubmit (): void {
    this.$refs.form.validate().then((success: boolean) => {
      if (!success) { return }

      this.createTicket(this.data)
    })
  }
}
</script>

<style scoped lang="scss">
  .ticket {
    --input-width: 100%;

    border-radius: 6px;
    background-color: var(--white);
    padding: 2.5em 10%;
    margin-bottom: 4em;

    &__text {
      font-size: var(--size-xxs);
      margin: 2em 0;
    }
  }
</style>
