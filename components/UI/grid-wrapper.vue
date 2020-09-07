<template>
  <b-container fluid>
    <b-row>
      <b-col
        :class="{ 'col__left--hide' : showAside }"
        class="p-0 col__left"
      >
        <div class="col__left--content">
          <slot name="aside" />

          <button
            :class="{ rotate : showAside }"
            class="btn btn-flex mt-4 btn-transition"
            type="button"
            @click="toggleAside"
          >
            <img src="/icons/Arrow-left.svg" class="img">
          </button>
        </div>
      </b-col>

      <b-col
        :class="{ 'col__right--large' : showAside }"
        class="col__right"
      >
        <slot name="main" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'nuxt-property-decorator'

@Component
export default class GridWrapper extends Vue {
  @Prop({ type: Boolean, required: true }) showAside!: boolean

  @Emit()
  toggleAside (): void {}
}
</script>

<style scoped lang="scss">
  .col {
    &__left {
      transition: all 500ms ease;
      flex: 0 0 var(--aside-width);
      max-width: var(--aside-width);
      position: relative;

      &--hide {
        flex: 0 0 var(--aside-width-hidden);
        max-width: var(--aside-width-hidden);
      }

      &--content {
        position: sticky;
        top: 4.75em;
      }
    }

    &__right {
      transition: all 500ms ease;
      flex: 0 0 calc(100% - var(--aside-width));
      max-width: calc(100% - var(--aside-width));
      padding: 0 2em;

      &--large {
        flex: 0 0 calc(100% - var(--aside-width-hidden));
        max-width: calc(100% - var(--aside-width-hidden));
      }
    }
  }

  .rotate {
    transform: rotate(180deg);
  }
</style>
