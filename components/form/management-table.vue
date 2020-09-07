<template>
  <b-container fluid class="p-0">
    <b-row
      v-for="(row, index) in localValue"
      :key="index"
      :class="{ 'mt-2' : index }"
      class="position-relative align-items-center"
    >
      <template v-for="(colKey, index2) in Object.keys(row)">
        <b-col :key="-index2" :cols="colSize(Object.keys(row).length, index2)">
          <factory-field
            :config="config.fields[colKey]"
            :value="row[colKey]"
            @input="inputColValue($event, colKey, index)"
          />
        </b-col>

        <b-col
          v-if="localValue.length > 1 && index2 + 1 === Object.keys(row).length"
          :key="index2 + 1000"
          cols="1"
        >
          <button
            class="btn btn-flex btn-transparent small"
            type="button"
            @click="deleteRow(index)"
          >
            <img src="/icons/Delete.svg" alt="trash" class="img">
          </button>
        </b-col>
      </template>
    </b-row>

    <b-row>
      <b-col cols="11" class="text-right">
        <button class="btn btn-transparent" type="button" @click="addRow">
          {{ btnText }} <b>+</b>
        </button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Prop, Emit, Watch, mixins } from 'nuxt-property-decorator'
import FactoryField from '~/components/form/factory-field.vue'
import FormFieldMixin from '~/mixins/form-field-mixin'
import InfoTexts from '~/assets/js/glossary/info-texts.json'
import { InputValue, MultiSelectValue, TableRowValue } from '~/types'

@Component({
  components: { FactoryField }
})
export default class ManagementTable extends mixins(FormFieldMixin) {
  @Prop({ type: Object, required: true }) config!: any
  @Prop({ type: Array, default: [] }) readonly value!: TableRowValue[]
  @Prop({ type: String, default: 'Додати документ' }) btnText!: string

  public localValue: TableRowValue[] = []

  mounted (): void {
    this.setNewValue(this.value)
  }

  @Watch('value')
  public onUpdateValue (newValue: TableRowValue[]): void {
    this.setNewValue(newValue)
  }

  public addRow (): void {
    const row: TableRowValue = {}
    Object.keys(this.config.fields).forEach((el: string) => {
      row[el] = this.config.fields[el].defaultValue
    })

    this.localValue.push(row)
    this.input()
  }

  public deleteRow (rowIndex: number): void {
    const result: boolean = confirm(InfoTexts.confirmDeleteRow)
    if (result) {
      this.localValue.splice(rowIndex, 1)
      this.input()
    }
  }

  public inputColValue (value: InputValue|MultiSelectValue, key: string, index: number): void {
    this.localValue[index][key] = value
    this.input()
  }

  public colSize (length: number, index: number): number {
    const colsLength: number = 11 // because one column is a button
    const cols: number = Math.floor(colsLength / length)
    return index || length === 1 ? cols : cols + 1
  }

  @Emit()
  public input (): TableRowValue[] {
    return this.localValue
  }

  private setNewValue (newValue: TableRowValue[]): void {
    if (JSON.stringify(this.localValue) !== JSON.stringify(newValue)) {
      this.localValue = [...newValue]
    }
  }
}
</script>
