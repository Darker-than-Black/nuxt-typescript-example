import { Component, Watch, Emit, mixins } from 'nuxt-property-decorator'
import debounce from 'lodash/debounce'
import FormFieldMixin from '~/mixins/form-field-mixin'
import { FormFieldValue } from '~/types'
const debounceTimer: number = 500

@Component
export default class ValidateFieldMixin extends mixins(FormFieldMixin) {
  public localValue: FormFieldValue = ''

  mounted (): void {
    if (this.value) {
      this.setNewValue(this.value)
    }
  }

  @Watch('localValue')
  onInput () {
    this.debounceInput()
  }

  @Watch('value')
  public onLocalValue (newValue: FormFieldValue): void {
    this.setNewValue(newValue)
  }

  // debounce filter
  public debounceInput = debounce(this.input, debounceTimer)

  @Emit()
  public input (): FormFieldValue {
    return this.localValue
  }

  public setNewValue (newValue: FormFieldValue): void {
    if (JSON.stringify(this.localValue) !== JSON.stringify(newValue)) {
      this.localValue = newValue
    }
  }
}
