import { PokeImages } from './poke-images';
export interface GetPokemon {
  name: string;
  abilities: { ability: { name: string; url: string } }[]; //Included
  forms: [];
  game_indices: [];
  held_items: [];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  order: number;
  past_types: [];
  moves: [];
  species: {};
  stats: {
    stat: { name: string; url: string };
    effort: number;
    base_stat: number;
  }[];
  types: { slot: number; type: TypeObject }[];
  typesSimplified?: string;
  weight: number;
  sprites: { other: PokeImages };
  height: number;
  imageSimplified?: string;
}

interface TypeObject {
  name: string;
  url: string;
}
