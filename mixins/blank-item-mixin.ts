import get from 'lodash/get'
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { BlankItemConfig, FormFieldValue } from '~/types'

@Component
export default class BlankItemMixin extends Vue {
  @Prop({ type: Object, required: true }) config!: BlankItemConfig[]
  @Prop({ type: Object, required: true }) data!: FormFieldValue

  public getItem (path: string, defaultValue: FormFieldValue = '—'): FormFieldValue {
    return get(this.data, this.formatPath(path)) || defaultValue
  }

  public formatPath (value: string): string {
    try {
      return value.split('.').filter((el: string) => !!el).join('.')
    } catch (e) {
      return ''
    }
  }
}
