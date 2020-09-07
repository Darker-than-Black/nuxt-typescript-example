<template>
  <b-container v-click-outside="hideModals" tag="header" class="header" fluid>
    <b-row class="header__row">
      <b-col cols="5">
        <nuxt-link to="/" class="link header__logo">
          <img src="/logo.png" class="img header__logo--img" alt="logo">

          <span class="header__logo--line" />

          <p class="btn header__logo--text">
            Інспект
          </p>
        </nuxt-link>
      </b-col>
      <b-col cols="7" class="d-flex align-items-center justify-content-end">
        <nuxt-link to="/" class="link btn header__link mr-2">
          Інструкція користувача
        </nuxt-link>

        <button type="button" class="btn btn-bordered btn-flex mr-2" @click="showModal(modalType.services)">
          <img src="/icons/Products.svg" alt="products" class="img">
        </button>

        <button type="button" class="btn btn-bordered" @click="showModal(modalType.nav)">
          User
          <img src="/icons/User.svg" alt="user" class="img">
        </button>
      </b-col>
    </b-row>

    <nav-modal :class="{ show : showUserNav }">
      <user-nav />
    </nav-modal>

    <nav-modal :class="{ show : showUserServices }">
      <user-services />
    </nav-modal>
  </b-container>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import UserNav from '~/components/user/user-nav.vue'
import NavModal from '~/components/UI/nav-modal.vue'
import UserServices from '~/components/user/user-services.vue'

@Component({
  components: { UserNav, NavModal, UserServices }
})
export default class Header extends Vue {
  public showUserNav: boolean = false
  public showUserServices: boolean = false
  public modalType: any = { nav: 'nav', services: 'services' }

  public showModal (name: string): void {
    this.hideModals()

    switch (name) {
      case this.modalType.nav:
        this.showUserNav = !this.showUserNav
        break
      case this.modalType.services:
        this.showUserServices = !this.showUserServices
        break
    }
  }

  public hideModals (): void {
    this.showUserNav = false
    this.showUserServices = false
  }
}
</script>

<style scoped lang="scss">
  .header {
    &__row {
      padding-top: 0.25em;
      padding-bottom: 0.25em;
    }

    &__logo {
      display: inline-flex;
      align-items: center;

      &--img {
        width: 200px;
      }

      &--line {
        display: inline-block;
        background: linear-gradient(101.3deg, #5e6f89 11.14%, #2b3d5a 84.5%), #fff;
        height: 36px;
        width: 2px;
        border-radius: 3px;
        margin-left: 0.75em;
        margin-right: 0.75em;
      }

      &--text {
        margin-bottom: 0;
        font-size: var(--size-m);
      }
    }

    &__link {
      font-size: var(--size-s);
    }
  }
</style>
