<template>
  <div>
    <b-header />

    <grid-wrapper
      :show-aside="showShortNav"
      class="mt-3"
      @toggle-aside="toggleVisibleNav"
    >
      <template v-slot:aside>
        <b-aside :simple="showShortNav" />
      </template>

      <template v-slot:main>
        <b-container fluid>
          <b-row>
            <b-col cols="12">
              <breadcrumbs />
            </b-col>
          </b-row>
        </b-container>

        <Nuxt />
      </template>
    </grid-wrapper>

    <client-only>
      <notifications
        position="bottom right"
        :speed="500"
        :duration="5000"
        classes="notification"
      />
    </client-only>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import Header from '~/components/UI/header.vue'
import GridWrapper from '~/components/UI/grid-wrapper.vue'
import Aside from '~/components/UI/aside.vue'
import Breadcrumbs from '~/components/UI/breadcrumbs.vue'

@Component({
  components: {
    'b-aside': Aside,
    'b-header': Header,
    GridWrapper,
    Breadcrumbs
  }
})
export default class DefaultLayout extends Vue {
  private localStorageVar: string = 'visible-short-nav'
  public showShortNav: boolean = true

  mounted (): void {
    const showShortNav: string = localStorage.getItem(this.localStorageVar) || 'true'
    this.showShortNav = /true/.test(showShortNav)
  }

  public toggleVisibleNav (): void {
    this.showShortNav = !this.showShortNav
    localStorage.setItem(this.localStorageVar, JSON.stringify(this.showShortNav))
  }
}
</script>

<style lang="scss">
  body {
    background-color: var(--gray);
  }
</style>
