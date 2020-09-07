<template>
  <b-container fluid class="declaration">
    <b-row class="mb-5">
      <b-col cols="6" class="d-flex align-items-center">
        <nuxt-link :to="links.declarations.path" class="link">
          <img src="/icons/Arrow-right.svg" alt="prev page" class="img img__rotate left">
        </nuxt-link>

        <div
          v-if="data.status"
          :class="{ red : statuses[data.status] && statuses[data.status].color === 'red' }"
          class="declaration__status mr-3 ml-3"
        >
          {{ statuses[data.status] ? statuses[data.status].text : data.status }}
        </div>

        <h1 class="title">
          {{ links.declarations.subLinks._id.text }}
          {{ data.declarationNumber ? '№' : '' }}
          {{ data.declarationNumber }}
        </h1>
      </b-col>

      <b-col cols="6" class="text-right">
        <timer v-if="data.inspectionStartedAt" :time="data.inspectionStartedAt" />
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="6">
        <article class="declaration__col">
          <div
            v-for="(config, index) in blankItemConfig"
            :key="index"
            :style="itemStyle(config)"
            class="declaration__item"
          >
            <blank-simple
              v-if="getItem(config.path) && config.type === blankItemTypes.SIMPLE"
              :data="getItem(config.path, {})"
              :config="config"
            />

            <blank-slider
              v-if="getItem(config.path) && config.type === blankItemTypes.SLIDER"
              :data="getItem(config.path, [])"
              :config="config"
            />

            <blank-subject
              v-if="getItem(config.path) && config.type === blankItemTypes.SUBJECT"
              :data="getItem(config.path, {})"
              :config="config"
            />
          </div>
        </article>
      </b-col>

      <b-col cols="6"></b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import get from 'lodash/get'
import { Vue, Component, Watch, namespace } from 'nuxt-property-decorator'
import Timer from '~/components/UI/timer.vue'
import BlankSubject from '~/components/blank/items/blank-subject.vue'
import BlankSlider from '~/components/blank/items/blank-slider/index.vue'
import BlankSimple from '~/components/blank/items/blank-simple.vue'
import LINKS from '~/assets/js/glossary/links.json'
import STATUSES from '~/assets/js/glossary/statuses.json'
import DECLARATION_BLANK_ITEMS from '~/assets/js/glossary/balnk/declaration-blank-items'
import BLANK_ITEM_TYPES from '~/assets/js/glossary/balnk/blank-item-types.json'
import { BlankItemConfig, Declaration, DeclarationStatuses, FormFieldValue, Links } from '~/types'

const declaration = namespace('declaration/declaration')

@Component({
  components: { Timer, BlankSubject, BlankSlider, BlankSimple }
})
export default class DeclarationPage extends Vue {
  public links: Links
  public statuses: DeclarationStatuses
  public blankItemTypes: { [key: string]: string }
  public blankItemConfig: BlankItemConfig[]

  constructor () {
    super()
    this.links = LINKS
    this.statuses = STATUSES
    this.blankItemTypes = BLANK_ITEM_TYPES
    this.blankItemConfig = DECLARATION_BLANK_ITEMS
  }

  @declaration.State data!: Declaration

  @Watch('data')
  onUpdateData (newValue: Declaration) {
    if (newValue.error) {
      this.$router.push({ path: LINKS.declarations.path })
    }
  }

  mounted (): void {
    try {
      const id: string = this.$route.params.id
      this.getData(id)
    } catch (e) {}
  }

  @declaration.Mutation cleanModule!: () => void
  @declaration.Action getData!: (id: string) => void

  public getItem (path: string, defaultValue: FormFieldValue = ''): FormFieldValue {
    return get(this.data, path) || defaultValue
  }

  public itemStyle (config: BlankItemConfig): object {
    return {
      width: config.width || '50%'
    }
  }
}
</script>

<style lang="scss">
  .declaration {
    margin-bottom: 4rem;

    &__status {
      color: var(--white);
      padding: 0.25em 0.75em;
      border-radius: 2em;
      background-color: var(--green-100);
      display: inline-block;

      &.red {
        background-color: var(--red-100);
      }
    }

    &__col {
      background-color: var(--white);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.22);
      border-radius: 12px;
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
    }

    &__item {
      padding: 0.5rem;
    }
  }
</style>
