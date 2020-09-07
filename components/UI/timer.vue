<template>
  <div class="timer">
    <p class="timer__text">
      Час на обробку
    </p>
    <div v-if="currentTime" class="timer__list">
      <p v-if="deadlineFail" class="timer__item">
        Прострочено на
      </p>

      <template v-for="(item, index) in Object.keys(currentTime)">
        <p :key="index" class="timer__item">
          {{ currentTime[item] }}{{ timerConfig[item] }}
        </p>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import Converter from '~/assets/js/utils/converter'
import { ITimer } from '~/types/UI'

const oneSecond: number = 1000
const timeItem: number = 60
const oneHour: number = oneSecond * timeItem * timeItem

@Component
export default class Timer extends Vue {
  @Prop({ type: String, required: true }) time!: string
  @Prop({ type: Number, default: 4 }) duration!: number

  public deadline: Date
  public currentTime: ITimer | null
  public timerConfig: { [key: string]: string }
  public deadlineFail: boolean
  public timeoutFunc: any

  constructor () {
    super()
    this.deadline = new Date()
    this.currentTime = null
    this.deadlineFail = false
    this.timerConfig = {
      hours: 'год.',
      minutes: 'хв.'
    }
  }

  mounted (): void {
    this.deadline = Converter.timeAddHours(new Date(this.time), this.duration)
    setTimeout(this.countdown, 1)
  }

  destroyed () {
    clearTimeout(this.timeoutFunc)
  }

  public countdown (): void {
    const first: number = new Date(this.deadline).getTime()
    const last: number = new Date().getTime()
    let total: number = first - last

    if (total <= 0) {
      this.deadlineFail = true
    }

    if (this.deadlineFail) {
      total = total * -1
    }

    this.currentTime = {
      hours: Math.floor(total / oneHour),
      minutes: Math.floor((total / oneSecond / timeItem) % timeItem)
    }

    this.timeoutFunc = setTimeout(this.countdown, oneSecond)
  }
}
</script>

<style scoped lang="scss">
  .timer {
    display: inline-block;
    font-size: var(--size-xs);
    text-align: left;

    &__text {
      color: var(--gray-600);
      margin-bottom: 0.25rem;
    }

    &__list {
      display: flex;
    }

    &__item {
      margin-right: 0.5rem;
      margin-bottom: 0;
    }
  }
</style>
