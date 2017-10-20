export enum ViewThingType {
  loc_map = "MAP",
  loc_table = "TABLE",
  loc_form = "FORM",
  loc_chart = "CHART"
}

export enum DataThingColumnType {
  text = 'TEXT',
  number = 'NUMBER',
  date = 'DATE',
  percentage = 'PERCENTAGE',
  geometry = 'GEOMETRY'
}

export interface ConfigThing {
  meta: {
    id: string,
    title: string
  },
  page_things: PageThing[],
  view_things: ViewThing[]
}

export interface PageThing {
  id: string,
  title: string,
  view_things: ViewThing[]
}

export interface ViewThing {
  title: string,
  type: ViewThingType,
  dataThings: DataThing[] | DataViewThing[]
}

export interface DataThing {
  id: string,
  title: string,
  columns: DataThingColumn[]
}

export interface DataThingColumn {
  label: string,
  field: string,
  type: DataThingColumnType,

  inputFormat?: string,
  outputFormat?: string,
  html?: boolean,
}

export interface Filter {
  key: string,
  value: string
}

export interface DataViewThing extends DataThing {
  filters: Filter[]
}
