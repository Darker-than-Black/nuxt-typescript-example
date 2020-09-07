<template>
  <b-container fluid class="page">
    <b-row class="mb-3">
      <b-col cols="8">
        <h1 class="title">
          Зона митного контролю
        </h1>
      </b-col>

      <b-col cols="4" class="text-right">
        <nuxt-link
          :to="linkToJournal.subLinks['create-ticket'].path"
          class="btn btn-black"
          type="button"
        >
          Створити талон +
        </nuxt-link>
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

          <template v-slot:head(entryMark.date)="data">
            <img src="/icons/Clockface.svg" alt="Clockface" class="img img__size-l" :title="data.label">
          </template>

          <template v-slot:cell(entryMark.date)="data">
            <date-interval-view
              :date-from="getValue(data.item, 'entryMark.date')"
              :date-to="getValue(data.item, 'exitMark.date')"
            />
          </template>

          <template v-slot:cell(driver.firstName)="data">
            {{ getUserName(data.item.driver) }}
          </template>

          <template v-slot:cell(cardNumber)="data">
            <nuxt-link
              :to="`${linkToJournal.path}/${data.item.cardNumber}`"
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
import get from 'lodash/get'
import { Component, namespace, mixins } from 'nuxt-property-decorator'
import DateIntervalView from '~/components/UI/date-interval-view.vue'
import EntryJournalFields from '~/assets/js/glossary/tables/entry-journal-list/fields.json'
import LINKS from '~/assets/js/glossary/links.json'
import { QueryParams, TableConfig, EntryJournal, EntryJournalUser, TableColConfig, Link } from '~/types'
import PageTableMixin from '~/mixins/page-table-mixin'

const journal = namespace('entry-journal/list')

@Component({
  components: { DateIntervalView }
})
export default class EntryJournalListPage extends mixins(PageTableMixin) {
  @journal.State data!: EntryJournal[]
  @journal.State serverConfig!: TableConfig

  public fields: TableColConfig[] = EntryJournalFields
  public linkToJournal: Link = LINKS.journal

  @journal.Action getData!: (query: QueryParams) => void
  @journal.Mutation cleanModule!: () => void

  public getUserName (user: EntryJournalUser | undefined): string {
    if (!user) { return '—' }

    return `${user.firstName} ${user.lastName} ${user.patronym}`
  }

  public getValue (obj: object, path: string, defaultValue: string = ''): string {
    return get(obj, path) || defaultValue
  }
}
</script>
