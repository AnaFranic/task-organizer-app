import { CardList } from "./cardList.models";

export interface Board {
  id: number;
  name: string;
  cardLists?: CardList[];
}
