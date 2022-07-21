import { Injectable } from '@angular/core';
import { GetPokemon } from '../interfaces/get-pokemon';

@Injectable({
  providedIn: 'root',
})
export class LocalPokemonsService {
  localPokemons: GetPokemon[];

  constructor() {}

  setlocalPokemons(localPokemons: GetPokemon[]) {
    this.localPokemons = localPokemons;
  }
}
