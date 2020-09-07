export type InputValue = number|string|boolean

export type MultiSelectValue = InputValue[]

export type SelectOptions = SelectOption[]

export type SelectOption = {
  value: InputValue,
  text: string
}

export type TableRowValue = {
  [key: string]: FormFieldValue
}

export type FormFieldValue = InputValue|MultiSelectValue[]|TableRowValue[]|object

export interface IFormFieldComponentProps {
  value?: FormFieldValue,
  readonly label?: string,
  readonly disabled?: boolean,
  readonly inputClasses?: string[]|string,
  // input attrs
  readonly type?: string,
  readonly placeholder?: string,
  // select attrs
  readonly options?: SelectOptions,
  readonly filterKey?: string,
  // for validate
  readonly vid?: string,
  readonly rules?: string,
  // for data list
  readonly listLink?: string,
}

export interface IFactoryFieldConfig extends IFormFieldComponentProps {
  // ~/assets/js/glossary/field-types.json
  readonly fieldType: string,
  readonly defaultValue: FormFieldValue,
  readonly invisible?: boolean,
  readonly fields?: {
    [key: string]: IFactoryFieldConfig
  }
}

export interface IFactoryFieldsConfig {
  [key: string]: IFactoryFieldConfig
}
