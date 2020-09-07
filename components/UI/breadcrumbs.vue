<template>
  <ul class="page-path">
    <li class="page-path__item">
      <nuxt-link :to="links.index.path" class="link">
        <img
          :src="`/icons/${links.index.icon}.svg`"
          :alt="links.index.text"
          class="img"
        >
      </nuxt-link>
    </li>

    <template v-for="(page, index) in pathToPage">
      <li :key="index" class="page-path__item">
        /
      </li>
      <li :key="-index - 1" class="page-path__item">
        <nuxt-link :to="page.path" class="link">
          {{ page.text }}
        </nuxt-link>
      </li>
    </template>
  </ul>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator'
import LINKS from '~/assets/js/glossary/links.json'
import { Link, Links } from '~/types'

@Component
export default class Breadcrumbs extends Vue {
  public links: Links = LINKS
  public pathElements: string[] = []

  get pathToPage (): Link[] {
    let prevPathLevel: Links = LINKS
    return this.pathElements.map((pathName: string) => {
      let element: Link = prevPathLevel[pathName]
      const levelKeys: string[] = Object.keys(prevPathLevel)
      // search dynamic route
      const keyToDynamicRoute: string|undefined = levelKeys.find((pathKey: string) => /_/.test(pathKey))

      if (!levelKeys.includes(pathName) && keyToDynamicRoute) {
        element = prevPathLevel[keyToDynamicRoute]
      }

      if (element.subLinks) {
        prevPathLevel = element.subLinks
      }

      return element
    })
  }

  @Watch('$route')
  onRoute (to: { path: string }, from: { path: string }): void {
    if (to.path !== from.path) {
      this.updateRoute(to.path)
    }
  }

  mounted (): void {
    try {
      const path: string = this.$route.path
      this.updateRoute(path)
    } catch (e) {}
  }

  private updateRoute (path: string): void {
    this.pathElements = path.split('/').filter((el: string) => !!el)
  }
}
</script>

<style scoped lang="scss">
  .page-path {
    list-style: none;
    padding-left: 0;
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    &__item {
      padding-right: 0.5em;
    }
  }
</style>
