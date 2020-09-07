<template>
  <b-row class="page__nav">
    <b-col cols="6" class="d-flex align-items-center pr-0 justify-content-between">
      <b-pagination
        v-if="Object.keys(config).length"
        v-model="queryParams.page"
        :total-rows="config.totalElements"
        :per-page="queryParams.size"
        first-number
        last-number
        class="pagination"
        @input="updateTable"
      />

      <p class="title gray small ml-2">
        Всього: {{ config.totalElements }}
      </p>
    </b-col>

    <b-col cols="6" class="d-flex align-items-center justify-content-end">
      <p class="title gray small">
        Кількість на сторінку
      </p>

      <b-form-group class="m-0">
        <b-form-radio-group
          v-model="queryParams.size"
          :options="rowsCountConfig"
          class="radiobtn-group__btn"
          @input="updateSizeElementOfPage"
        />
      </b-form-group>
    </b-col>
  </b-row>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'nuxt-property-decorator'
import ROWS_COUNT from '~/assets/js/glossary/tables/rows-count.json'
import { QueryParams, TableConfig } from '~/types'

@Component
export default class TableNav extends Vue {
  @Prop({ type: Object, required: true }) config!: TableConfig
  @Prop({ type: Object, required: true }) queryParams!: QueryParams

  public rowsCountConfig: number[] = ROWS_COUNT

  @Emit()
  public updateTable (): void {}

  @Emit()
  public updateSizeElementOfPage (): void {}
}
</script>
