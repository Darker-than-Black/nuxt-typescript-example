<template>
  <div v-click-outside="hideOptions" class="filter__wrapper">
    <label :for="label" class="title__field">
      {{ label }}
      <span v-if="isRequired">*</span>
    </label>

    <div class="filter">
      <p
        :class="[
          inputClasses,
          { active : isActive },
          { open : showOptions }
        ]"
        class="filter__label"
        @click="toggleOptionsBar"
      >
        <slot name="name" />

        <img
          :class="{ top : showOptions }"
          src="/icons/Arrow-down.svg"
          alt="arrow"
          class="img filter__icon"
        >
      </p>

      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'nuxt-property-decorator'

@Component
export default class FilterWrapper extends Vue {
  @Prop({ type: String, default: '' }) label!: string
  @Prop({ type: Boolean, required: true }) showOptions!: boolean
  @Prop({ type: Boolean, required: true }) isActive!: boolean
  @Prop({ type: Function, required: true }) hideOptions!: any
  @Prop({ type: Boolean, default: false }) readonly isRequired!: boolean
  @Prop({ type: [Array, String], default: '' }) readonly inputClasses!: string[]|string

  @Emit()
  public toggleOptionsBar (): void {}
}
</script>
