<template>
  <div class="slider-nav">
    <button
      :disabled="currentSlide <= 1"
      class="btn btn-flex btn-transparent small mr-2"
      @click="prevSlide"
    >
      <img src="/icons/Arrow-right.svg" alt="next" class="img img__rotate left">
    </button>
    <span class="mr-2 slider-nav__text">
      {{ currentSlide }} / {{ sliderSize }}
    </span>

    <button
      :disabled="currentSlide >= sliderSize"
      class="btn btn-flex btn-transparent small"
      @click="nextSlide"
    >
      <img src="/icons/Arrow-right.svg" alt="next" class="img">
    </button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'nuxt-property-decorator'

@Component
export default class SliderNav extends Vue {
  @Prop({ type: Number, default: 1 }) sliderSize!: number
  public currentSlide: number = 1

  public nextSlide (): void {
    if (this.currentSlide < this.sliderSize) {
      this.currentSlide++
      this.input()
    }
  }

  public prevSlide (): void {
    if (this.currentSlide > 1) {
      this.currentSlide--
      this.input()
    }
  }

  @Emit()
  private input (): number {
    return this.currentSlide
  }
}
</script>

<style scoped lang="scss">
  .slider-nav {
    display: flex;
    align-items: center;

    &__text {
      white-space: nowrap;
    }
  }
</style>
