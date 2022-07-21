import { Component, OnInit } from '@angular/core';
import { CurrentStatsService } from '../services/current-stats.service';
import { GetPokemon } from '../interfaces/get-pokemon';
import { WebService } from '../services/web.service';
import { SpeciesInfo } from '../interfaces/species-info';
import { EvolutionChainCall } from '../interfaces/evolution-chain';

@Component({
  selector: 'app-pokemon-stats',
  templateUrl: './pokemon-stats.component.html',
  styleUrls: ['./pokemon-stats.component.scss'],
})
export class PokemonStatsComponent implements OnInit {
  currentPokemon: GetPokemon = this.currentStatsService.currentPokemon;
  abilities = '';
  currentSpecies: SpeciesInfo; 
  evolutionChain: EvolutionChainCall;
  evoChainClean: {species_name: string, min_level: number, trigger_name: string, item: string   }[] = [];

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
    var evoData = resultObject.chain;
    do {
      var evoDetails = evoData['evolution_details'][0];
    
      this.evoChainClean.push({
        species_name: evoData.species.name,
        min_level: !evoDetails ? 1 : evoDetails.min_level,
        trigger_name: !evoDetails ? null : evoDetails.trigger.name,
        item: !evoDetails ? null : evoDetails.item
      });
      evoData = evoData['evolves_to'][0];
    } while (!!evoData && evoData.hasOwnProperty('evolves_to'));
    console.log(this.evoChainClean, "clean Evo Chain")
    this.evolutionChain = resultObject;
  })
  }

  ngOnInit(): void {
    console.log(this.currentPokemon, 'from POKEMON STATS COMPONENT');
    this.convertAbilitiesToStr();
    this.getSpeciesInfo(this.currentPokemon.name);
  }
}
