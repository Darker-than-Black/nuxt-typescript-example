import { Vue, Component, Prop } from 'nuxt-property-decorator'
import FieldWrapper from '~/components/form/field-wrapper.vue'
import { IFormFieldComponentProps, FormFieldValue } from '~/types'

@Component({
  components: { FieldWrapper }
})
export default class FormFieldMixin extends Vue implements IFormFieldComponentProps {
  // field value
  @Prop({ type: [String, Number, Array, Boolean] }) value!: FormFieldValue
  @Prop({ type: String, default: '' }) readonly label!: string
  @Prop({ type: String, default: '' }) readonly placeholder!: string
  @Prop({ type: Boolean, default: false }) readonly disabled!: boolean
  @Prop({ type: String, default: 'text' }) readonly type!: string
  @Prop({ type: [Array, String], default: '' }) readonly inputClasses!: string[]|string
  // for validate
  @Prop({ type: String, default: '' }) readonly vid!: string
  @Prop({ type: String, default: '' }) readonly rules!: string
  // for data list
  @Prop({ type: String, default: '' }) readonly listLink!: string

  get isRequired (): boolean {
    return /required/.test(this.rules)
  }
}
