<template>
  <div>
    <div class="d-flex align-items-center user__row">
      <div class="user__icon">
        VD
      </div>

      <span class="user__name">
        Влад Данилюк
      </span>
    </div>

    <ul class="user-nav__list">
      <nuxt-link to="/" tag="li" class="link user-nav__item">
        Налаштування
        <img src="/icons/Settings.svg" alt="settings" class="img">
      </nuxt-link>
    </ul>

    <div class="user__row">
      <button class="btn btn-gray" type="button" @click="logout">
        Вихід
        <img src="/icons/Exit.svg" alt="Exit" class="img">
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit } from 'nuxt-property-decorator'

@Component
export default class UserNav extends Vue {
  @Emit()
  public logout ():void {}
}
</script>

<style scoped lang="scss">
  .user-nav {
    &__list {
      list-style: none;
      padding-left: 0;
      margin-top: 0.75em;
      padding-top: 0.75em;
      margin-bottom: 0.75em;
      padding-bottom: 0.75em;
      border-top: 1px solid var(--gray-300);
      border-bottom: 1px solid var(--gray-300);
    }

    &__item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-left: 1em;
      padding-right: 1em;
      cursor: pointer;
    }
  }
</style>
