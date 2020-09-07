export type Links = {
  [key: string]: Link
}

export type Link = {
  text: string,
  icon?: string,
  path: string,
  subLinks?: Links
}
