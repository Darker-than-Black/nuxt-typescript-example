<template>
  <div class="d-inline-block">
    <b-input
      :label="label"
      :list-link="listLink"
      :value="value"
      :placeholder="MULTI_SELECT_LABELS.chooseValue"
      input-classes="input__padding-right"
      @input="input"
    >
      <img
        src="/icons/Arrow-down.svg"
        alt="arrow"
        class="img filter__icon"
      >
    </b-input>

    <datalist :id="listLink">
      <option
        v-for="(opt, i) in options"
        :key="i"
        :value="opt"
      />
    </datalist>
  </div>
</template>

<script lang="ts">
import { Component, mixins, Prop, Emit } from 'nuxt-property-decorator'
import FilterSelectMixin from '~/mixins/filter-select-mixin'
import Input from '~/components/form/input.vue'
import { InputValue } from '~/types'

@Component({
  components: { 'b-input': Input }
})
export default class FilterDatalist extends mixins(FilterSelectMixin) {
  @Prop({ type: String, required: true }) listLink!: string
  @Prop({ type: [String, Number], default: '' }) readonly value!: InputValue
  @Prop({ type: Array, required: true }) readonly options!: string[]

  @Emit()
  public input (value: InputValue): InputValue {
    return value
  }
}
</script>
