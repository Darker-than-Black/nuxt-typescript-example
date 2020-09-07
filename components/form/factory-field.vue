<template>
  <div>
    <form-select
      v-if="config.fieldType === filedTypes.SELECT"
      :label="config.label"
      :value="value || config.defaultValue"
      :vid="config.vid"
      :rules="config.rules"
      :options="optionsKeys[config.filterKey]"
      @input="input"
    />

    <checkbox
      v-else-if="config.fieldType === filedTypes.BOOLEAN"
      :label="config.label"
      :value="value || config.defaultValue"
      :vid="config.vid"
      :rules="config.rules"
      @input="input"
    />

    <management-table
      v-else-if="config.fieldType === filedTypes.TABLE"
      :config="config.fields"
      :value="value || config.defaultValue"
      @input="input"
    />

    <validate-input
      v-else
      :label="config.label"
      :value="value || config.defaultValue"
      :vid="config.vid"
      :type="config.type"
      :rules="config.rules"
      :placeholder="config.placeholder"
      @input="input"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, mixins } from 'nuxt-property-decorator'
import SelectOptionsMixin from '~/mixins/select-options-mixin'
import ValidateInput from '~/components/form/validate-input.vue'
import FormSelect from '~/components/form/select.vue'
import Checkbox from '~/components/form/checkbox.vue'
import ManagementTable from '~/components/form/management-table.vue'
import FIELD_TYPES from '~/assets/js/glossary/field-types.json'
import { IFactoryFieldConfig, FormFieldValue } from '~/types'

@Component({
  components: { ValidateInput, FormSelect, Checkbox, ManagementTable }
})
export default class FactoryField extends mixins(SelectOptionsMixin) {
  public filedTypes: { [key: string]: string } = FIELD_TYPES

  @Prop({ type: [String, Number, Array, Boolean] }) value!: FormFieldValue
  @Prop({ type: Object, required: true }) config!: IFactoryFieldConfig

  @Emit()
  public input (value: FormFieldValue) {
    return value
  }
}
</script>
