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
  images: string[] = [];
  constructor(private webService: WebService) {}

  getPokemons() {
    this.webService.getAllPokemons().subscribe((resultObject) => {
      console.log(resultObject);
      resultObject.results.forEach((pokemon) => {
        this.pokemons.push(pokemon);

        this.getImage(pokemon.url);
      });
    });
  }

  getImage(url: string) {
    this.webService.getPokemon(url).subscribe((resultObject) => {
      console.log(resultObject.sprites.other.dream_world.front_default);
      this.images.push(resultObject.sprites.other.dream_world.front_default);
    });
  }

  ngOnInit(): void {
    this.getPokemons();
  }
}
