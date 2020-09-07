<template>
  <div class="filters">
    <filter-multi-select
      :value="value.multiSelect"
      label="Multi select"
      :options="selectOptionsExample"
      @input="input($event, 'multiSelect')"
    />

    <filter-select
      :value="value.select"
      label="select"
      :options="selectOptionsExample"
      @input="input($event, 'select')"
    />

    <filter-datalist
      :value="value.datalist"
      label="Datalist"
      list-link="datalist"
      :options="dataListOptionsExample"
      @input="input($event, 'datalist')"
    />

    <DatepickerRange
      :value="value.dateRange"
      label="Date range"
      @input="input($event, 'dateRange')"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit, Prop } from 'nuxt-property-decorator'
import FilterMultiSelect from '~/components/filter/filter-multi-select.vue'
import FilterSelect from '~/components/filter/filter-select.vue'
import FilterDatalist from '~/components/filter/filter-datalist.vue'
import DatepickerRange from '~/components/form/datepicker-range.vue'
import { SelectOption } from '~/types'

@Component({
  components: { FilterMultiSelect, FilterSelect, FilterDatalist, DatepickerRange }
})
export default class ExtendedOfFilters extends Vue {
  @Prop({ type: Object, required: true }) value!: any
  // Example work filters
  public dataListOptionsExample: string[] = ['Оберіть значення', 'Name 2', 'lorem ipsum', 'Name 4']
  public selectOptionsExample: SelectOption[] = [
    { value: '1', text: 'Оберіть значення' },
    { value: '2', text: 'Name 2' },
    { value: '3', text: 'Name 3' },
    { value: '4', text: 'Name 4' }
  ]

  @Emit()
  public input (value: any, key: string): { value: any, key: string } {
    return { value, key }
  }
}
</script>

<style scoped lang="scss">
  .filters {
    background-color: var(--white);
    border-radius: 6px;
    padding: 0.5em 0.75em;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
