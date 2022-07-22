import { LocalPokemonsService } from './../services/local-pokemons.service';
import { LocalImagesService } from './../services/local-images.service';
import { Component, OnInit } from '@angular/core';
import { WebService } from '../services/web.service';
import { CurrentStatsService } from '../services/current-stats.service';
import { PokemonUrl } from '../interfaces/pokemon-url';
import { Router } from '@angular/router';
import { GetPokemon } from '../interfaces/get-pokemon';
import { LocalImages } from '../interfaces/local-images';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss'],
})
export class PokemonsComponent implements OnInit {
  pokemonsInit: PokemonUrl[] = this.localPokemonService.localPokemonsInit;
  images: LocalImages[] = [];
  fullPokemons: GetPokemon[] = [];
  constructor(
    private webService: WebService,
    public router: Router,
    private currentStatsService: CurrentStatsService,
    public localImageService: LocalImagesService,
    public localPokemonService: LocalPokemonsService
  ) {}

  getPokemons() {
    if (this.localPokemonService.localPokemonsInit.length === 0) {
      this.webService.getAllPokemons().subscribe((resultObject) => {
        resultObject.results.forEach((pokemon) => {
          this.pokemonsInit.push(pokemon);

          this.getImage_and_fullPokemon(pokemon.url);
        });
        this.localPokemonService.setlocalPokemonsInit(this.pokemonsInit);
      });
    } else {
      this.pokemonsInit = this.localPokemonService.localPokemonsInit;
      this.fullPokemons = this.localPokemonService.localPokemons;
      this.images = this.localImageService.localImages;
    }
  }

  getImage_and_fullPokemon(url: string) {
    this.webService.getPokemon(url).subscribe((fullPokemon) => {
      const id = fullPokemon.sprites.other.dream_world.front_default.replace(
        /[^0-9]/g,
        ''
      );
      this.fullPokemons[parseInt(id) - 1] = fullPokemon;
      this.images[parseInt(id) - 1] = {
        image: fullPokemon.sprites.other.dream_world.front_default,
        pokemonName: fullPokemon.name,
      };
    });
    this.localPokemonService.setlocalPokemons(this.fullPokemons);
    this.localImageService.setlocalImages(this.images);
  }

  navigateToPokemon(index: number) {
    this.currentStatsService.setCurrentPokemon(
      this.localPokemonService.localPokemons[index]
    );
    this.router.navigate(['stats'], {
      queryParams: {
        id: index,
      },
      queryParamsHandling: 'merge',
    });
  }

  ngOnInit(): void {
    this.getPokemons();
  }
}
