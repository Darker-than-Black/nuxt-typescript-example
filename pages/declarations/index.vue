<template>
  <b-container fluid class="page">
    <b-row class="mb-3">
      <b-col cols="12">
        <h1 class="title">
          Декларації
        </h1>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="12">
        <b-table
          show-empty
          :items="data"
          :fields="fields"
          :sort-by="sortBy"
          :sort-desc="sortDesc"
          :no-local-sorting="true"
          class="table"
          tbody-tr-class="table__row"
          @sort-changed="sorted"
        >
          <template v-slot:cell()="data">
            {{ data.value || '—' }}
          </template>

          <template v-slot:head(status)="data">
            <img src="/icons/Approved.svg" alt="approved" class="img img__size-l" :title="data.label">
          </template>

          <template v-slot:head(inspectionStartedAt)="data">
            <img src="/icons/Clockface.svg" alt="Clockface" class="img img__size-l" :title="data.label">
          </template>

          <template v-slot:cell(id)="data">
            <nuxt-link
              :to="`${linkToDeclarations}/${data.item.id}`"
              class="btn link btn-flex btn-gray"
            >
              <img src="/icons/Arrow-right.svg" alt="arrow right" class="img">
            </nuxt-link>
          </template>
        </b-table>
      </b-col>
    </b-row>

    <table-nav
      :config="serverConfig"
      :query-params="queryParams"
      @update-table="updateTable"
      @update-size-element-of-page="resetPageToFirst"
    />
  </b-container>
</template>

<script lang="ts">
import { Component, namespace, mixins } from 'nuxt-property-decorator'
import DeclarationsFields from '~/assets/js/glossary/tables/declarations/fields.json'
import LINKS from '~/assets/js/glossary/links.json'
import PageTableMixin from '~/mixins/page-table-mixin'
import { QueryParams, Declaration, TableConfig, TableColConfig } from '~/types'

const declarations = namespace('declaration/list')

@Component
export default class DeclarationsPage extends mixins(PageTableMixin) {
  @declarations.State data!: Declaration[]
  @declarations.State serverConfig!: TableConfig

  public fields: TableColConfig[] = DeclarationsFields
  public linkToDeclarations: string = LINKS.declarations.path

  @declarations.Action getData!: (query: QueryParams) => void
  @declarations.Mutation cleanModule!: () => void
}
</script>
