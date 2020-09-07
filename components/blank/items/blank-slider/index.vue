<template>
  <div class="slider">
    <div class="slider__item">
      <blank-subject
        :data="currentData"
        :config="config"
      >
        <slider-nav
          :slider-size="data.length"
          class="ml-2"
          @input="currentSlide = $event"
        />
      </blank-subject>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import BlankSubject from '~/components/blank/items/blank-subject.vue'
import SliderNav from '~/components/blank/items/blank-slider/slider-nav.vue'
import { BlankItemConfig, FormFieldValue } from '~/types'

@Component({
  components: { BlankSubject, SliderNav }
})
export default class BlankSlider extends Vue {
  @Prop({ type: Object, required: true }) config!: BlankItemConfig[]
  @Prop({ type: Array, required: true }) data!: FormFieldValue[]

  public currentSlide: number = 1

  get currentData (): any {
    return this.data[this.currentSlide - 1]
  }
}
</script>
