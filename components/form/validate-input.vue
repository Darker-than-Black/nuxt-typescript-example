<template>
  <validation-provider
    v-slot="{ errors, classes }"
    :rules="rules"
    :vid="vid"
    class="w-100 d-block"
    mode="eager"
  >
    <div class="position-relative pb-4">
      <b-input
        v-model="localValue"
        :name="label"
        :input-classes="[classes, inputClasses]"
        :label="label"
        :is-required="isRequired"
        :placeholder="placeholder"
        :disabled="disabled"
        :type="type"
        :list-link="listLink"
        :rules="rules"
      />

      <div class="input__error">
        {{ errors[0] }}
      </div>
    </div>
  </validation-provider>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import Input from '~/components/form/input.vue'
import ValidateFieldMixin from '~/mixins/validate-filed-mixin'

@Component({
  components: { 'b-input': Input }
})
export default class ValidateInput extends mixins(ValidateFieldMixin) {}
</script>
