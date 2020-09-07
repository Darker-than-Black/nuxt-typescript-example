import VueTestInstance from '~/test/factory/vue-instance'
import { TestComponentInstanceConfig } from '~/types'

const mockTemplate: any = {
  template: '<div>Mock Template</div>'
}

export default function (userConfig: TestComponentInstanceConfig, template: any = mockTemplate) {
  return VueTestInstance(template, userConfig)
}
