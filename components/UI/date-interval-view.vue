<template>
  <div class="d-flex align-items-center">
    <svg
      width="10"
      height="26"
      viewBox="0 0 10 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="d-inline-block mr-2 "
    >
      <path d="M7 13C7 10.925 8.49188 9.13589 9.44461 7.29257C9.79955 6.60585 10 5.82633 10 5C10 2.23858 7.76142 0 5 0C2.23858 0 0 2.23858 0 5C0 5.82633 0.200454 6.60585 0.555388 7.29257C1.50812 9.13589 3 10.925 3 13C3 15.075 1.50812 16.8641 0.555389 18.7074C0.200454 19.3942 0 20.1737 0 21C0 23.7614 2.23858 26 5 26C7.76142 26 10 23.7614 10 21C10 20.1737 9.79955 19.3942 9.44461 18.7074C8.49188 16.8641 7 15.075 7 13Z" fill="white" class="svg-path" />
      <circle cx="5" cy="5" r="3" :fill="dateFrom ? colorGreen : colorGray" />
      <circle cx="5" cy="21" r="3" :fill="dateTo ? colorGreen : colorGray" />
    </svg>
    <div class="d-inline-block">
      {{ dateFrom ? $moment(dateFrom).format('MM.DD.YYYY h:mm') : '—' }}
      <br>
      {{ dateTo ? $moment(dateTo).format('MM.DD.YYYY h:mm') : '—' }}
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class DateIntervalView extends Vue {
  @Prop({ type: String, required: true }) dateFrom!: string
  @Prop({ type: String, required: true }) dateTo!: string

  public colorGreen: string = '#5FCB09'
  public colorGray: string = '#CCC'
}
</script>
