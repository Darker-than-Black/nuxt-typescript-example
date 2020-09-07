<template>
  <section :class="config.class" class="blank-item">
    <div :class="config.headerClass" class="blank-item__header">
      <h4 class="blank-item__title">
        {{ config.title }}
      </h4>

      <span v-if="config.countryPath" class="blank-item__gray ml-2">
        {{ getItem(config.countryPath) }}
      </span>

      <slot />
    </div>

    <div
      :class="config.itemsContentClass"
      class="blank-item__content"
    >
      <div
        v-for="(item, index) in config.items"
        :key="index"
        :class="item.itemClass"
        class="blank-item__content--element"
      >
        <div :class="{ 'mt-3': index }" class="blank-item__gray">
          {{ item.title }}
        </div>
        <div class="blank-item__text">
          {{ getItem(item.path) }}
        </div>
      </div>

      <div
        v-for="(item, index) in config.icons"
        :key="-(index + 1)"
      >
        <div class="blank-item__gray mt-3">
          {{ item.title }}
        </div>

        <ul class="blank-item__list">
          <li
            v-for="(icon, index2) in item.items"
            :key="index2"
            :class="config.itemListClass"
            class="blank-item__text blank-item__btn"
          >
            {{ getItem(`${item.path}.${icon}`) }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import BlankItemMixin from '~/mixins/blank-item-mixin'

@Component
export default class BlankSubject extends mixins(BlankItemMixin) {}
</script>
