<template>
  <div class="nav-modal">
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class NavModal extends Vue {}
</script>

<style scoped lang="scss">
  .nav-modal {
    position: fixed;
    background-color: var(--white);
    right: 15px;
    padding: 1.25em 0;
    border: 1px solid var(--gray-300);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.22);
    border-radius: 6px;
    z-index: 9;
    width: var(--user-nav-width);
    margin-right: calc(-1 * (var(--user-nav-width) + 55px));
    transition: 0.5s all;

    &.show {
      margin-right: 0;
    }
  }
</style>
