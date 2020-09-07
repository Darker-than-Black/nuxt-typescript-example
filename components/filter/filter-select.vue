<template>
  <filter-wrapper
    :label="label"
    :hide-options="hideOptions"
    :show-options="showOptions"
    :is-active="!!value"
    :is-required="isRequired"
    :input-classes="inputClasses"
    @toggle-options-bar="showOptions = !showOptions"
  >
    <template v-slot:name>
      {{ value || MULTI_SELECT_LABELS.chooseValue }}
    </template>

    <template v-slot:default>
      <ul v-show="showOptions" class="filter__list">
        <li
          v-for="(option, i) in options"
          :key="i"
          :class="{ selected : value === option.value || !option.value && !value }"
          class="filter__item"
          @click="input(option.value)"
        >
          {{ option.text }}
        </li>
      </ul>
    </template>
  </filter-wrapper>
</template>

<script lang="ts">
import { Component, Prop, Emit, mixins } from 'nuxt-property-decorator'
import FilterSelectMixin from '~/mixins/filter-select-mixin'
import { InputValue } from '~/types'

@Component
export default class FilterSelect extends mixins(FilterSelectMixin) {
  @Prop({ type: [String, Number], default: '' }) readonly value!: InputValue

  @Emit()
  public input (value: InputValue): InputValue {
    this.hideOptions()
    if (value === this.value) {
      return ''
    }

    return value
  }
}
</script>
