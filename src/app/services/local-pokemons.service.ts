import { Injectable } from '@angular/core';
import { GetPokemon } from '../interfaces/get-pokemon';
import { PokemonUrl } from '../interfaces/pokemon-url';

@Injectable({
  providedIn: 'root',
})
export class LocalPokemonsService {
  localPokemons: GetPokemon[];
  localPokemonsInit: PokemonUrl[] = [];

  constructor() {}

  setlocalPokemons(localPokemons: GetPokemon[]) {
    this.localPokemons = localPokemons;
  }

  setlocalPokemonsInit(localPokemonsInit: PokemonUrl[]) {
    this.localPokemonsInit = localPokemonsInit;
  }
}
