import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs';
import { GetRequest } from '../interfaces/get-request';

@Injectable({
  providedIn: 'root'
})
export class WebService {
  private api = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(private http: HttpClient) { 

   }

   getAllPokemons() {
    const path = `${this.api}/?limit=24`;
    return this.http.get<GetRequest>(path).pipe(delay(1000));
  }
}
