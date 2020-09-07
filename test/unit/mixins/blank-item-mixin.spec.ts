import get from 'lodash/get'
import VueMixinInstance from '~/test/factory/vue-mixin-instance'
import BlankItemMixin from '~/mixins/blank-item-mixin'
import DECLARATION_BLANK_ITEMS from '~/assets/js/glossary/balnk/declaration-blank-items'
import DeclarationMock from '~/test/api/declaration-info.json'

describe('mixin declaration-info-item-mixin', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = VueMixinInstance({
      options: {
        mixins: [BlankItemMixin],
        propsData: {
          config: DECLARATION_BLANK_ITEMS[0],
          data: DeclarationMock
        }
      }
    })
  })

  it('initialize correctly', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  describe('test formatPath()', () => {
    it('without value', () => {
      expect(wrapper.vm.formatPath()).toBe('')
    })

    it('valide value', () => {
      const value: string = 'val1.val2'
      expect(wrapper.vm.formatPath(value)).toEqual(value)
    })

    it('don\'t valide value', () => {
      const value: string = 'val1.val2'
      expect(wrapper.vm.formatPath(`.${value}`)).toEqual(value)
    })
  })

  describe('test getItem()', () => {
    it('check default value', () => {
      expect(wrapper.vm.getItem('asd')).toBe('—')
    })

    it('check get value', () => {
      const value: string = 'declaration.clearanceTypeCode'
      expect(wrapper.vm.getItem(value)).toEqual(get(DeclarationMock, value))
    })
  })
})
