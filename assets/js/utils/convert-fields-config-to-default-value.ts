import FIELD_TYPES from '~/assets/js/glossary/field-types.json'
import { IFactoryFieldConfig, TableRowValue, IFactoryFieldsConfig } from '~/types'

/**
 * This converts the configuration fields to the default values
 */
export default function (config: IFactoryFieldsConfig): TableRowValue {
  const dataDefaultValue: any = {}

  Object.keys(config).forEach((key: string) => {
    const fieldConfig: IFactoryFieldConfig = config[key]
    const fields: { [key: string]: IFactoryFieldConfig } | undefined = fieldConfig.fields
    dataDefaultValue[key] = fieldConfig.defaultValue
    if (fields) {
      const row: TableRowValue = {}
      Object.keys(fields).forEach((key2: string) => {
        row[key2] = fields[key2].defaultValue
      })

      if (fieldConfig.fieldType === FIELD_TYPES.OBJECT) {
        dataDefaultValue[key] = row
      } else if (fieldConfig.fieldType === FIELD_TYPES.TABLE) {
        dataDefaultValue[key].push(row)
      }
    }
  })

  return dataDefaultValue
}
