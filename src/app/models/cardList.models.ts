import { Card } from "./card.models";

export interface CardList {
  id: number;
  name: string;
  cards?: Card[];
}
