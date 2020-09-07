export interface BlankItemField {
  title: string,
  path: string,
  itemClass?: string,
  countryPath?: string
}

export interface BlankItemList extends BlankItemField {
  items: string[]
}

export interface BlankItemConfig {
  type: string,
  path: string,
  title?: string,
  countryPath?: string,
  width?: string,
  class?: string,
  headerClass?: string,
  itemsContentClass?: string,
  itemListClass?: string,
  items: BlankItemField[],
  icons?: BlankItemList[]
}
