import { Component, OnInit } from '@angular/core';
import { CurrentStatsService } from '../services/current-stats.service';
import { GetPokemon } from '../interfaces/get-pokemon';
import { WebService } from '../services/web.service';

@Component({
  selector: 'app-pokemon-stats',
  templateUrl: './pokemon-stats.component.html',
  styleUrls: ['./pokemon-stats.component.scss'],
})
export class PokemonStatsComponent implements OnInit {
  currentPokemon: GetPokemon = this.currentStatsService.currentPokemon;
  abilities = '';

  constructor(
    public currentStatsService: CurrentStatsService,
    private webService: WebService
  ) {}

  convertAbilitiesToStr() {
    console.log(this.currentPokemon.abilities);
    this.abilities = this.currentPokemon.abilities
      .map((user) => user.ability.name)
      .toString();
  }

  getSpeciesInfo(pokemonName: string) {
    this.webService.getSpeciesInfo(pokemonName).subscribe((resultObject) => {
      console.log(resultObject, 'SpeciesInfo');
    });
  }

  ngOnInit(): void {
    console.log(this.currentPokemon, 'from POKEMON STATS COMPONENT');
    this.convertAbilitiesToStr();
    this.getSpeciesInfo(this.currentPokemon.name);

    console.log(
      this.currentPokemon.sprites.other['official-artwork'],
      'IMAGES STORE'
    );
  }
}
