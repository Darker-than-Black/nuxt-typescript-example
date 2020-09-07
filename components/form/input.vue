<template>
  <field-wrapper :label="label" :is-required="isRequired">
    <div class="position-relative">
      <input
        :id="label"
        :value="value"
        :name="label"
        :placeholder="placeholder"
        :disabled="disabled"
        :type="type"
        :list="listLink"
        :class="inputClasses"
        class="input"
        @input="input"
      >

      <slot />
    </div>
  </field-wrapper>
</template>

<script lang="ts">
import { Component, Emit, mixins } from 'nuxt-property-decorator'
import FormFieldMixin from '~/mixins/form-field-mixin'
import { InputValue } from '~/types'

@Component
export default class Input extends mixins(FormFieldMixin) {
  @Emit()
  public input (value: any): InputValue {
    return value.target.value
  }
}
</script>
