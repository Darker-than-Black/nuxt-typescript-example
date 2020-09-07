<template>
  <filter-wrapper
    :label="label"
    :hide-options="hideOptions"
    :show-options="showOptions"
    :is-active="!!value.length"
    @toggle-options-bar="showOptions = !showOptions"
  >
    <template v-slot:name>
      {{ selectLabel }}
      {{ value.length ? `(${value.length})` : '' }}
    </template>

    <template v-slot:default>
      <checkbox-group
        v-show="showOptions"
        :options="options"
        :value="value"
        @input="input"
      />
    </template>
  </filter-wrapper>
</template>

<script lang="ts">
import { Component, Prop, Emit, mixins } from 'nuxt-property-decorator'
import CheckboxGroup from '~/components/form/checkbox-group.vue'
import FilterSelectMixin from '~/mixins/filter-select-mixin'
import { MultiSelectValue } from '~/types'

@Component({
  components: { CheckboxGroup }
})
export default class FilterMultiSelect extends mixins(FilterSelectMixin) {
  @Prop({ type: Array, required: true }) readonly value!: MultiSelectValue

  get selectLabel (): string {
    if (this.value.length && this.value.length < this.options.length) {
      return this.MULTI_SELECT_LABELS.selective
    } else if (this.value.length === this.options.length) {
      return this.MULTI_SELECT_LABELS.all
    }

    return this.MULTI_SELECT_LABELS.chooseValue
  }

  @Emit()
  public input (value: MultiSelectValue): MultiSelectValue {
    return value
  }
}
</script>
