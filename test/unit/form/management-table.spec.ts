import BootstrapVue from 'bootstrap-vue'
import VueTestInstance from '~/test/factory/vue-instance'
import ManagementTable from '~/components/form/management-table.vue'
import CONFIG from '~/assets/js/glossary/form/create-ticker'
import ConvertFieldsConfigToDefaultValue from '~/assets/js/utils/convert-fields-config-to-default-value'
import { CreateTicket } from '~/types'

const dataDefaultValue: CreateTicket = ConvertFieldsConfigToDefaultValue(CONFIG) as CreateTicket

describe('management-table.vue', () => {
  let wrapper: any
  const newValue: any[] = [{ document: 'Doc 1', number: '1234' }]

  beforeEach(() => {
    wrapper = VueTestInstance(ManagementTable, {
      modules: [BootstrapVue],
      options: {
        propsData: {
          config: CONFIG.documents,
          value: dataDefaultValue.documents
        }
      }
    })
  })

  it('initialize correctly', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('should match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  describe('test function: setNewValue()', () => {
    it('don\'t set new inputValue', () => {
      wrapper.vm.setNewValue(dataDefaultValue.documents)
      expect(wrapper.vm.localValue).toEqual(dataDefaultValue.documents)
    })

    it('update inputValue', () => {
      wrapper.vm.setNewValue(newValue)
      expect(wrapper.vm.localValue).toEqual(newValue)
    })
  })

  it('check emit: input()', () => {
    wrapper.vm.setNewValue(newValue)
    expect(wrapper.vm.input()).toEqual(newValue)
  })

  it('should set new value in onUpdateValue()', () => {
    wrapper.vm.setNewValue = jest.fn()
    wrapper.vm.onUpdateValue(newValue)
    expect(wrapper.vm.setNewValue).toHaveBeenCalledWith(newValue)
  })

  it('should add row an emit "input" in addRow()', () => {
    let rowsCount: number = 1
    wrapper.vm.input = jest.fn()
    expect(wrapper.vm.localValue.length).toBe(rowsCount)
    wrapper.vm.addRow()
    rowsCount++
    expect(wrapper.vm.input).toHaveBeenCalled()
    expect(wrapper.vm.localValue.length).toBe(rowsCount)
  })

  describe('test function deleteRow()', () => {
    it('delete row', () => {
      let rowsCount: number = 1
      global.confirm = jest.fn(() => true)
      wrapper.vm.input = jest.fn()
      expect(wrapper.vm.localValue.length).toBe(rowsCount)
      wrapper.vm.deleteRow(0)
      rowsCount--
      expect(global.confirm).toHaveBeenCalled()
      expect(wrapper.vm.localValue.length).toBe(rowsCount)
      expect(wrapper.vm.input).toHaveBeenCalled()
    })

    it('don\'t delete row', () => {
      const rowsCount: number = 1
      global.confirm = jest.fn(() => false)
      wrapper.vm.input = jest.fn()
      expect(wrapper.vm.localValue.length).toBe(rowsCount)
      wrapper.vm.deleteRow(0)
      expect(global.confirm).toHaveBeenCalled()
      expect(wrapper.vm.localValue.length).toBe(rowsCount)
      expect(wrapper.vm.input).not.toHaveBeenCalled()
    })
  })

  it('test function inputColValue()', () => {
    wrapper.vm.input = jest.fn()
    wrapper.vm.inputColValue('asd', 'document', 0)
    expect(wrapper.vm.localValue[0].document).toBe('asd')
  })
})
