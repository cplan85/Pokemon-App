import { Component, OnInit } from '@angular/core';
import { CurrentStatsService } from '../services/current-stats.service';
import { GetPokemon } from '../interfaces/get-pokemon';
import { WebService } from '../services/web.service';
import { SpeciesInfo } from '../interfaces/species-info';
import { EvolutionChain } from '../interfaces/species-info';

@Component({
  selector: 'app-pokemon-stats',
  templateUrl: './pokemon-stats.component.html',
  styleUrls: ['./pokemon-stats.component.scss'],
})
export class PokemonStatsComponent implements OnInit {
  currentPokemon: GetPokemon = this.currentStatsService.currentPokemon;
  abilities = '';
  currentSpecies: SpeciesInfo; 
  evolutionChain: EvolutionChain;

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
      this.currentStatsService.setCurrentSpecies(resultObject);
      this.currentSpecies = resultObject;
      console.log(resultObject, "species");
      this.getEvolutionChainInfo(resultObject.evolution_chain.url)
     
    });
  }

  getEvolutionChainInfo(url: string)
 {
  this.webService.getEvolutionChain(url).subscribe((resultObject) => {
    console.log(resultObject, "evolution Chain")
    this.evolutionChain = resultObject;
  })
  }

  ngOnInit(): void {
    console.log(this.currentPokemon, 'from POKEMON STATS COMPONENT');
    this.convertAbilitiesToStr();
    this.getSpeciesInfo(this.currentPokemon.name);
  }
}
