export interface ISortInformation {
  sortBy: string;
  direction: "asc" | "desc" | "";
}

export interface IFilterInformation {
  filterBy: string;
  filterValue: string;
}
