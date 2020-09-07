<template>
  <b-container fluid>
    <b-row class="mb-3">
      <b-col cools="12">
        <h1 class="title">
          Журнал зони митного контролю
        </h1>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="12">
        <extended-of-filters
          :value="queryParams"
          @input="onSelectedHandler"
        />
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        {{ queryParams }}
      </b-col>
      <b-col cols="12">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet consectetur consequuntur cupiditate dolorem, eos est fuga illo ipsam, itaque labore laudantium modi odit, omnis perferendis quia quis similique veritatis vitae?
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import ExtendedOfFilters from '~/components/filter/index.vue'
import RouterQueryParamsMixin from '~/mixins/router-query-params'
import TYPES from '~/assets/js/glossary/types.json'
import { QueryParam, QueryParams, QueryParamsConfig } from '~/types'

@Component({
  components: { ExtendedOfFilters }
})
export default class IndexPage extends mixins(RouterQueryParamsMixin) {
  // Example work filters
  public queryParamsConfig: QueryParamsConfig = {
    select: {
      type: TYPES.String,
      defaultValue: ''
    },
    multiSelect: {
      type: TYPES.Array,
      defaultValue: []
    },
    datalist: {
      type: TYPES.String,
      defaultValue: ''
    },
    dateRange: {
      type: TYPES.Array,
      defaultValue: []
    }
  }

  public queryParams: QueryParams = {
    select: '',
    multiSelect: [],
    datalist: '',
    dateRange: []
  }

  public onSelectedHandler ({ value, key }: { value: QueryParam, key: string }): void {
    this.queryParams[key] = value
    this.debounceRoute()
  }
}
</script>
