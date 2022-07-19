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
  stats: [];
  types: TypeObject[];
  weight: number;
  sprites: { other: PokeImages };
  height: number;
}

interface TypeObject {
  name: string;
  url: string;
}
