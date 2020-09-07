import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class NotificationMixin extends Vue {
  public messageTypes = {
    error: 'error',
    warn: 'warn',
    success: 'success'
  }

  public message (title: string, type: string = this.messageTypes.success): void {
    this.$notify({ type, title })
  }
}
