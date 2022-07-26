import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs';
import { GetRequest } from '../interfaces/get-request';
import { GetPokemon } from '../interfaces/get-pokemon';
import { SpeciesInfo } from '../interfaces/species-info';
import { EvolutionChainCall } from '../interfaces/evolution-chain';

@Injectable({
  providedIn: 'root',
})
export class WebService {
  private api = 'https://pokeapi.co/api/v2/';
  private next: string = '';

  constructor(private http: HttpClient) {}

  getAllPokemons() {
    const path = `${this.api}pokemon/?limit=24`;
    return this.http.get<GetRequest>(path).pipe(delay(1000));
  }

  setNextApi(url: string) {
    this.next = url;
  }

  getNextPokemons() {
    const path = this.next;
    return this.http.get<GetRequest>(path).pipe(delay(1000));
  }

  getPokemon(fullUrl: string) {
    const path = fullUrl;
    return this.http.get<GetPokemon>(path);
  }

  getAllTags() {
    const path = `${this.api}type/`;
    return this.http.get<GetRequest>(path).pipe(delay(1000));
  }

  getSpeciesInfo(name: string) {
    const path = `${this.api}pokemon-species/${name}`;
    return this.http.get<SpeciesInfo>(path);
  }

  getEvolutionChain(fullUrl: string) {
    const path = fullUrl;
    return this.http.get<EvolutionChainCall>(path);
  }
}
