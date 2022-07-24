import { Injectable } from '@angular/core';
import { GetPokemon } from '../interfaces/get-pokemon';
import { PokemonUrl } from '../interfaces/pokemon-url';
import { Tag } from '../interfaces/tag';

@Injectable({
  providedIn: 'root',
})
export class LocalPokemonsService {
  localPokemons: GetPokemon[];
  localPokemonsInit: PokemonUrl[] = [];
  tags: Tag[] = [];

  constructor() {}

  setlocalPokemons(localPokemons: GetPokemon[]) {
    this.localPokemons = localPokemons;
  }

  setlocalPokemonsInit(localPokemonsInit: PokemonUrl[]) {
    this.localPokemonsInit = localPokemonsInit;
  }

  setTags(tags: Tag[]) {
    this.tags = tags;
  }
}
