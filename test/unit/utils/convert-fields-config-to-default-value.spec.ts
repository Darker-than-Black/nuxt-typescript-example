import ConvertFieldsConfigToDefaultValue from '~/assets/js/utils/convert-fields-config-to-default-value'
import FIELD_TYPES from '~/assets/js/glossary/field-types.json'
import { IFactoryFieldsConfig } from '~/types'

const config: IFactoryFieldsConfig = {
  documents: {
    fieldType: FIELD_TYPES.TABLE,
    fields: {
      document: {
        fieldType: FIELD_TYPES.SELECT,
        defaultValue: ''
      },
      number: {
        fieldType: FIELD_TYPES.STRING,
        defaultValue: ''
      }
    },
    defaultValue: []
  },
  plateNumber: {
    fieldType: FIELD_TYPES.STRING,
    defaultValue: ''
  },
  vehicleCard: {
    fieldType: FIELD_TYPES.OBJECT,
    defaultValue: {},
    fields: {
      plateNumber: {
        fieldType: FIELD_TYPES.STRING,
        defaultValue: ''
      },
      brand: {
        fieldType: FIELD_TYPES.STRING,
        defaultValue: ''
      },
      numberOfPersons: {
        fieldType: FIELD_TYPES.STRING,
        defaultValue: 0
      },
      vehicleTypeId: {
        fieldType: FIELD_TYPES.STRING,
        defaultValue: 0
      },
      vehicleTypeName: {
        fieldType: FIELD_TYPES.SELECT,
        defaultValue: ''
      }
    }
  }
}

const dataDefaultValues: any = {
  documents: [{ document: '', number: '' }],
  plateNumber: '',
  vehicleCard: {
    brand: '',
    numberOfPersons: 0,
    plateNumber: '',
    vehicleTypeId: 0,
    vehicleTypeName: ''
  }
}

describe('utils convert-fields-config-to-default-value.ts', () => {
  it('check filed\'s config with types: string, table, object', () => {
    expect(ConvertFieldsConfigToDefaultValue(config)).toEqual(dataDefaultValues)
  })
})
