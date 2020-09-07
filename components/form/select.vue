<template>
  <validation-provider
    v-slot="{ errors, classes }"
    :rules="rules"
    :vid="vid"
    class="w-100 d-block"
    mode="eager"
  >
    <div class="position-relative pb-4">
      <filter-select
        v-model="localValue"
        :name="label"
        :input-classes="[classes, inputClasses]"
        :label="label"
        :is-required="isRequired"
        :options="options"
      />

      <div class="input__error">
        {{ errors[0] }}
      </div>
    </div>
  </validation-provider>
</template>

<script lang="ts">
import { Component, mixins, Prop } from 'nuxt-property-decorator'
import FilterSelect from '~/components/filter/filter-select.vue'
import ValidateFieldMixin from '~/mixins/validate-filed-mixin'
import { SelectOption } from '~/types'

@Component({
  components: { FilterSelect }
})
export default class FormSelect extends mixins(ValidateFieldMixin) {
  @Prop({ type: Array, required: true }) readonly options!: SelectOption[]
}
</script>
