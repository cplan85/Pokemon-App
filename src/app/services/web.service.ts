import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs';
import { GetRequest } from '../interfaces/get-request';
import { GetPokemon } from '../interfaces/get-pokemon';

@Injectable({
  providedIn: 'root',
})
export class WebService {
  private api = 'https://pokeapi.co/api/v2/';

  constructor(private http: HttpClient) {}

  getAllPokemons() {
    const path = `${this.api}pokemon/?limit=24`;
    return this.http.get<GetRequest>(path).pipe(delay(1000));
  }

  getPokemon(fullUrl: string) {
    const path = fullUrl;
    return this.http.get<GetPokemon>(path).pipe(delay(1000));
  }

  getAllTags() {
    const path = `${this.api}type/`;
    return this.http.get<GetRequest>(path).pipe(delay(1000));
  }
}
