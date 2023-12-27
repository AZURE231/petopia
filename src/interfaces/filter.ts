export interface IItem {
  id: number;
  title: string;
}

export interface IFilter {
  id: number;
  title: string;
  items: IItem[];
}
