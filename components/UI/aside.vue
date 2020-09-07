<template>
  <ul class="aside">
    <nuxt-link
      v-for="(link, i) in Object.values(navLinks)"
      :key="i"
      :to="link.path"
      tag="li"
      :class="{ 'content-center': simple }"
      class="aside__item"
    >
      <img
        :src="`/icons/${link.icon}.svg`"
        :alt="link.text"
        :class="{ 'mr-2' : !simple }"
        class="img"
      >
      <span :class="{ 'd-none' : simple }" class="aside__text">
        {{ link.text }}
      </span>
    </nuxt-link>
  </ul>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import LINKS from '~/assets/js/glossary/links.json'
import { Links } from '~/types'

@Component
export default class Aside extends Vue {
  @Prop({ type: Boolean, required: true }) simple!: boolean

  public navLinks: Links = LINKS
}
</script>

<style scoped lang="scss">
  .aside {
    background-color: var(--gray-200);
    border-radius: 0 20px 20px 0;
    padding: 0.75em;
    list-style: none;
    margin-right: 0.5em;
    margin-bottom: 0;

    &__item {
      display: inline-flex;
      align-items: center;
      width: 100%;
      margin-bottom: 0.5em;
      border-radius: 6px;
      padding: 0.5em;
      font-size: var(--size-s);
      line-height: var(--size-s);
      font-weight: 500;
      cursor: pointer;

      &:hover {
        background-color: var(--gray-100);
      }

      &.active-link {
        background-color: var(--white);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.13), 0 1px 2px rgba(0, 0, 0, 0.18);
      }
    }

    &__text {
      white-space: nowrap;
      animation: show 0.8s;
    }
  }

  @keyframes show {
    0% {
      display: none;
      opacity: 0;
    }

    40% {
      display: inline;
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
</style>
