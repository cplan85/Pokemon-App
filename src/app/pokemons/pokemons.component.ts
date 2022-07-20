import { Component, OnInit } from '@angular/core';
import { WebService } from '../services/web.service';
import { CurrentStatsService } from '../services/current-stats.service';
import { PokemonUrl } from '../interfaces/pokemon-url';
import { Router } from '@angular/router';
import { GetPokemon } from '../interfaces/get-pokemon';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss'],
})
export class PokemonsComponent implements OnInit {
  pokemonsInit: PokemonUrl[] = [];
  images: {}[] = [];
  fullPokemons: GetPokemon[] = [];
  constructor(
    private webService: WebService,
    public router: Router,
    private currentStatsService: CurrentStatsService
  ) {}

  getPokemons() {
    this.webService.getAllPokemons().subscribe((resultObject) => {
      console.log(resultObject);
      resultObject.results.forEach((pokemon) => {
        this.pokemonsInit.push(pokemon);

        this.getImage(pokemon.url);
        console.log('full pokemon', this.fullPokemons);
      });
    });
  }

  getImage(url: string) {
    this.webService.getPokemon(url).subscribe((fullPokemon) => {
      this.fullPokemons.push(fullPokemon);
      const id = fullPokemon.sprites.other.dream_world.front_default.replace(
        /[^0-9]/g,
        ''
      );

      this.images[parseInt(id) - 1] =
        fullPokemon.sprites.other.dream_world.front_default;
    });

    console.log(this.images, 'Images from GetImages');
  }

  navigateToPokemon(index: number) {
    this.currentStatsService.setCurrentPokemon(this.fullPokemons[index]);
    this.router.navigate(['stats'], {
      queryParams: {
        id: index,
      },
      queryParamsHandling: 'merge',
    });
    // this.webService.setCurrentIndex(index);
  }

  ngOnInit(): void {
    this.getPokemons();
  }
}
