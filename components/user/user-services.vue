<template>
  <div class="services">
    <div class="user__row text-center">
      <h3 class="services__title">
        Cервіси Капібара
      </h3>
    </div>
    <div class="user__row">
      <ul class="services__list">
        <li
          v-for="service in servicesConfig"
          :key="service.id"
          class="services__item"
        >
          <img :src="`/services/${service.icon}.png`" :alt="service.name" class="services__img">

          <p class="mb-0 mt-2">
            {{ service.name }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class UserServices extends Vue {
  public servicesConfig: any[] = [
    { id: 1, name: 'Інспект', icon: 'K' },
    { id: 2, name: 'АСУР', icon: 'E' },
    { id: 3, name: 'Customs Back', icon: 'E' },
    { id: 4, name: 'Infrastructure Map', icon: 'E' },
    { id: 5, name: 'BI', icon: 'E' }
  ]
}
</script>

<style scoped lang="scss">
  .services {
    max-height: var(--user-services-height);
    overflow: auto;

    &__title {
      font-size: var(--size-s);
    }

    &__list {
      list-style: none;
      padding-left: 0;
      display: flex;
      flex-wrap: wrap;
    }

    &__item {
      flex: 0 0 50%;
      font-size: var(--size-xxs);
      font-weight: 500;
      text-align: center;
      padding: 0.87em 1.5em;
      cursor: pointer;
      transition: all 0.2s;
      border-radius: 6px;

      &:hover {
        background-color: var(--gray-500);
      }
    }

    &__img {
      width: calc(var(--size-m) * 4);
      height: auto;
    }
  }
</style>
