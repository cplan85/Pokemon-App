import { Component, OnInit } from '@angular/core';
import { WebService } from '../services/web.service';
import { PokemonUrl } from '../interfaces/pokemon-url';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss'],
})
export class PokemonsComponent implements OnInit {
  pokemons: PokemonUrl[] = [];
  constructor(private webService: WebService) {}

  getPokemon() {
    this.webService.getAllPokemons().subscribe((resultObject) => {
      console.log(resultObject);
      resultObject.results.forEach((pokemon) => {
        this.pokemons.push(pokemon);
      });
      console.log(this.pokemons);
    });
  }

  ngOnInit(): void {
    this.getPokemon();
  }
}
