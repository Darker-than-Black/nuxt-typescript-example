import FIELD_TYPES from '~/assets/js/glossary/field-types.json'
import { IFactoryFieldsConfig } from '~/types'

const config: IFactoryFieldsConfig = {
  documents: {
    fieldType: FIELD_TYPES.TABLE,
    vid: 'documents',
    fields: {
      document: {
        label: 'Тип документу для ввозу',
        fieldType: FIELD_TYPES.SELECT,
        filterKey: 'documents',
        defaultValue: '',
        rules: 'required',
        vid: 'documents.document'
      },
      number: {
        label: 'Номер',
        fieldType: FIELD_TYPES.STRING,
        placeholder: 'Введіть номер',
        defaultValue: '',
        vid: 'documents.number'
      }
    },
    defaultValue: []
  },
  products: {
    fieldType: FIELD_TYPES.TABLE,
    vid: 'products',
    fields: {
      number: {
        label: 'Номер товару',
        fieldType: FIELD_TYPES.STRING,
        placeholder: 'Введіть номер товару',
        defaultValue: '',
        vid: 'products.number'
      }
    },
    defaultValue: []
  },
  driver: {
    fieldType: FIELD_TYPES.OBJECT,
    defaultValue: {},
    vid: 'driver',
    fields: {
      firstName: {
        fieldType: FIELD_TYPES.STRING,
        defaultValue: '',
        label: 'Ім\'я водія',
        placeholder: 'Введіть ім\'я водія',
        rules: 'required',
        vid: 'driver.firstName'
      },
      lastName: {
        fieldType: FIELD_TYPES.STRING,
        defaultValue: '',
        label: 'Прізвище водія',
        placeholder: 'Введіть прізвище водія',
        rules: 'required',
        vid: 'driver.lastName'
      },
      patronym: {
        fieldType: FIELD_TYPES.STRING,
        defaultValue: '',
        label: 'По батькові водія',
        placeholder: 'Введіть по батькові водія',
        rules: 'required',
        vid: 'driver.patronym'
      },
      identifier: {
        fieldType: FIELD_TYPES.STRING,
        defaultValue: '',
        label: 'ІНН водія',
        placeholder: 'Введіть ІНН водія',
        rules: 'required',
        vid: 'driver.identifier'
      }
    }
  },
  vehicleCard: {
    fieldType: FIELD_TYPES.OBJECT,
    defaultValue: {},
    vid: 'vehicleCard',
    fields: {
      plateNumber: {
        fieldType: FIELD_TYPES.STRING,
        defaultValue: '',
        label: 'Номер транспортного засобу',
        placeholder: 'Введіть номер транспортного засобу',
        rules: 'required',
        vid: 'vehicleCard.plateNumber'
      },
      brand: {
        fieldType: FIELD_TYPES.STRING,
        label: 'Модель транспортного засобу',
        placeholder: 'Введіть модель транспортного засобу',
        rules: 'required',
        defaultValue: '',
        vid: 'vehicleCard.brand'
      },
      numberOfPersons: {
        fieldType: FIELD_TYPES.STRING,
        label: 'Кількість пасажирів транспортного засобу',
        placeholder: 'Введіть кількість пасажирів транспортного засобу',
        rules: 'required',
        type: 'number',
        defaultValue: 0,
        vid: 'vehicleCard.numberOfPersons'
      },
      vehicleTypeId: {
        fieldType: FIELD_TYPES.STRING,
        type: 'number',
        invisible: true,
        defaultValue: 0,
        vid: 'vehicleCard.vehicleTypeId'
      },
      vehicleTypeName: {
        fieldType: FIELD_TYPES.SELECT,
        defaultValue: '',
        label: 'Тип транспортного засобу',
        filterKey: 'vehicleType',
        rules: 'required',
        vid: 'vehicleCard.vehicleTypeName'
      }
    }
  },
  carrier: {
    fieldType: FIELD_TYPES.OBJECT,
    defaultValue: {},
    vid: 'carrier',
    fields: {
      name: {
        fieldType: FIELD_TYPES.STRING,
        defaultValue: '',
        label: 'Назва перевізника',
        placeholder: 'Введіть назву перевізника',
        rules: 'required',
        vid: 'carrier.name'
      },
      identifier: {
        fieldType: FIELD_TYPES.STRING,
        defaultValue: '',
        label: 'ЄДРПОУ перевізника',
        placeholder: 'Введіть код ЄДРПОУ',
        rules: 'required',
        vid: 'carrier.identifier'
      }
    }
  }
}

export default config
