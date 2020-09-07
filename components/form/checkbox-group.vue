<template>
  <b-form-checkbox-group
    v-model="selected"
    class="filter__list"
  >
    <b-form-checkbox
      v-for="(option, i) in options"
      :key="i"
      :value="option.value"
      class="checkbox"
    >
      {{ option.text }}
    </b-form-checkbox>
  </b-form-checkbox-group>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Emit } from 'nuxt-property-decorator'
import { MultiSelectValue, SelectOption } from '~/types'

@Component
export default class CheckboxGroup extends Vue {
  @Prop({ type: Array, required: true }) readonly options!: SelectOption[]
  @Prop({ type: Array, default: () => { return [] } }) readonly value!: MultiSelectValue

  /**
   * create local a value, because the bootstrap checkbox must have the v-model attribute
   */
  public selected: MultiSelectValue = []

  mounted (): void {
    this.setSelectedValue(this.value)
  }

  @Watch('value')
  onSelectedProp (newValue: MultiSelectValue): void {
    this.setSelectedValue(newValue)
  }

  @Watch('selected')
  onSelected (newValue: MultiSelectValue): void {
    if (JSON.stringify(newValue) !== JSON.stringify(this.value)) {
      this.input()
    }
  }

  @Emit()
  public input (): MultiSelectValue {
    return this.selected
  }

  private setSelectedValue (value: MultiSelectValue): void {
    this.selected = [...value]
  }
}
</script>
