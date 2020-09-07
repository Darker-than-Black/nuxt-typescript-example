<template>
  <div>
    <label :for="label" class="title__field">
      {{ label }}
      <span v-if="isRequired">*</span>
    </label>

    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class FieldWrapper extends Vue {
  @Prop({ type: String, required: true }) readonly label!: string
  @Prop({ type: Boolean, default: false }) readonly isRequired!: boolean
}
</script>
