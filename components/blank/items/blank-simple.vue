<template>
  <section :class="config.class" class="blank-item">
    <div :class="config.headerClass" class="blank-item__header">
      <div
        v-for="(item, index) in config.icons"
        :key="-(index + 1)"
      >
        <div class="blank-item__gray">
          {{ item.title }}
        </div>

        <ul class="blank-item__list">
          <li
            v-for="(icon, index2) in item.items"
            :key="index2"
            :title="getItem(`${item.path}.${icon}`)"
            :class="config.itemListClass"
            class="blank-item__text blank-item__btn"
          >
            {{ getItem(`${item.path}.${icon}`) }}
          </li>
        </ul>
      </div>
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
        <div class="blank-item__gray">
          {{ item.title }}
        </div>

        <div class="blank-item__text blank-item__flex">
          <template v-if="item.countryPath">
            {{ getItem(item.path) }}
            <span class="blank-item__gray">
              {{ getItem(item.countryPath) }}
            </span>
          </template>

          <template v-else>
            {{ getItem(item.path) }}
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import BlankItemMixin from '~/mixins/blank-item-mixin'

@Component
export default class BlankSimple extends mixins(BlankItemMixin) {}
</script>
