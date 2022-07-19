import { Component, OnInit } from '@angular/core';
import { WebService } from '../services/web.service';
import { PokemonUrl } from '../interfaces/pokemon-url';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss'],
})
export class PokemonsComponent implements OnInit {
  pokemons: PokemonUrl[] = [];
  images: string[] = [];
  constructor(private webService: WebService, public router: Router) {}

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
      console.log(resultObject.types);
      this.images.push(resultObject.sprites.other.dream_world.front_default);
    });
  }

  navigateToPokemon(index: number) {
    //make array into full pokemon Array. You cant extract from array of just name and url
    //this.currentStarshipService.setCurrentStarship(this.starships[index]);
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
