import { PokeImages } from './poke-images';
export interface GetPokemon {
  abilities: [];
  forms: [];
  game_indices: [];
  held_items: [];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: [];
  species: {};
  sprites: { other: PokeImages };
}
