import { Component, OnInit } from '@angular/core';
import { CurrentStatsService } from '../services/current-stats.service';
import { GetPokemon } from '../interfaces/get-pokemon';

@Component({
  selector: 'app-pokemon-stats',
  templateUrl: './pokemon-stats.component.html',
  styleUrls: ['./pokemon-stats.component.scss'],
})
export class PokemonStatsComponent implements OnInit {
  currentPokemon: GetPokemon = this.currentStatsService.currentPokemon;
  abilities = '';

  convertAbilitiesToStr() {
    console.log(this.currentPokemon.abilities);
    this.abilities = this.currentPokemon.abilities
      .map((user) => user.ability.name)
      .toString();
  }
  constructor(public currentStatsService: CurrentStatsService) {}

  ngOnInit(): void {
    console.log(this.currentPokemon, 'from POKEMON STATS COMPONENT');
    this.convertAbilitiesToStr();
  }
}
