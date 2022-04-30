import { Character } from "./character";
export interface CharacterResponse  {
    items: Character[];
    itemsFrom: number;
    itemsTo: number;
    totalItemsCount: number;
    totalPages: number;
}