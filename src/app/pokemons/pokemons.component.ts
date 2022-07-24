import { LocalPokemonsService } from './../services/local-pokemons.service';
import { LocalImagesService } from './../services/local-images.service';
import { Component, OnInit } from '@angular/core';
import { WebService } from '../services/web.service';
import { CurrentStatsService } from '../services/current-stats.service';
import { Router } from '@angular/router';
import { GetPokemon } from '../interfaces/get-pokemon';
import { LocalImages } from '../interfaces/local-images';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss'],
})
export class PokemonsComponent implements OnInit {
  images: LocalImages[] = [];
  fullPokemons: GetPokemon[] = [];
  temporaryPokemons: GetPokemon[] = [];
  constructor(
    private webService: WebService,
    public router: Router,
    private currentStatsService: CurrentStatsService,
    public localImageService: LocalImagesService,
    public localPokemonService: LocalPokemonsService,
    public searchService: SearchService
  ) {}

  getPokemons() {
    if (this.localPokemonService.localPokemonsInit.length === 0) {
      this.webService.getAllPokemons().subscribe((resultObject) => {
        resultObject.results.forEach((pokemon) => {
          this.getImage_and_fullPokemon(pokemon.url);
        });
      });
    } else {
      this.fullPokemons = this.localPokemonService.localPokemons;
      this.images = this.localImageService.localImages;
    }
  }

  getImage_and_fullPokemon(url: string) {
    this.webService.getPokemon(url).subscribe((fullPokemon) => {
      const imgURL = fullPokemon.sprites.other.dream_world.front_default;
      const fixedURL = imgURL.replace(
        'master/https://raw.githubusercontent.com/PokeAPI/sprites/',
        ''
      );

      const id = fullPokemon.sprites.other.dream_world.front_default.replace(
        /[^0-9]/g,
        ''
      );
      this.fullPokemons[parseInt(id) - 1] = fullPokemon;
      this.fullPokemons[parseInt(id) - 1].imageSimplified = fixedURL;
      this.images[parseInt(id) - 1] = {
        image: fixedURL,
        pokemonName: fullPokemon.name,
      };
    });
    this.localPokemonService.setlocalPokemons(this.fullPokemons);
    this.localImageService.setlocalImages(this.images);

    this.temporaryPokemons = this.fullPokemons;
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
