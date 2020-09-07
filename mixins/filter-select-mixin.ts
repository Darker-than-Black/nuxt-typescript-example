import { Vue, Component, Prop } from 'nuxt-property-decorator'
import FilterWrapper from '~/components/filter/filter-wrapper.vue'
import MULTI_SELECT_LABELS from '~/assets/js/glossary/multi-select-labels.json'
import { SelectOption } from '~/types'

@Component({
  components: { FilterWrapper }
})
export default class FilterSelectMixin extends Vue {
  @Prop({ type: String, default: '' }) readonly label!: string
  @Prop({ type: Array, required: true }) readonly options!: SelectOption[] | string[]
  @Prop({ type: Boolean, default: false }) readonly isRequired!: boolean
  @Prop({ type: [Array, String], default: '' }) readonly inputClasses!: string[]|string

  public MULTI_SELECT_LABELS: any = MULTI_SELECT_LABELS
  public showOptions: boolean = false

  public hideOptions (): void {
    this.showOptions = false
  }
}
