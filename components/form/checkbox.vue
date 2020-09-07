<template>
  <validation-provider
    v-slot="{ errors, classes }"
    :rules="rules"
    :vid="vid"
    class="w-100 d-block"
    mode="eager"
  >
    <b-form-checkbox
      v-model="localValue"
      :name="label"
      :disabled="disabled"
      :input-classes="[classes, inputClasses]"
      class="checkbox"
    >
      {{ label }}
    </b-form-checkbox>

    <div class="input__error">
      {{ errors[0] }}
    </div>
  </validation-provider>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import ValidateFieldMixin from '~/mixins/validate-filed-mixin'

@Component
export default class Checkbox extends mixins(ValidateFieldMixin) {}
</script>
