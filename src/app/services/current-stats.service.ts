import { GetPokemon } from '../interfaces/get-pokemon';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CurrentStatsService {
  currentPokemon: GetPokemon = {
    name: '',
    abilities: [],
    forms: [],
    game_indices: [],
    held_items: [],
    id: 0,
    is_default: false,
    location_area_encounters: '',
    order: 0,
    past_types: [],
    moves: [],
    species: {},
    stats: [],
    types: [],
    weight: 0,
    sprites: {
      other: {
        dream_world: { front_default: '' },
        home: { front_default: '' },
        'official-artwork': { front_default: '' },
      },
    },
    height: 0,
  };

  constructor() {}

  setCurrentPokemon(pokemon: GetPokemon) {
    this.currentPokemon = pokemon;
  }
}
