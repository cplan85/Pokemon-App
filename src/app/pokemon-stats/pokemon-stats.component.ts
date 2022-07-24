import { LocalImagesService } from './../services/local-images.service';
import { Component, OnInit } from '@angular/core';
import { CurrentStatsService } from '../services/current-stats.service';
import { GetPokemon } from '../interfaces/get-pokemon';
import { WebService } from '../services/web.service';
import { SpeciesInfo } from '../interfaces/species-info';
import { EvolutionChainCall } from '../interfaces/evolution-chain';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-stats',
  templateUrl: './pokemon-stats.component.html',
  styleUrls: ['./pokemon-stats.component.scss'],
})
export class PokemonStatsComponent implements OnInit {
  currentPokemon: GetPokemon = this.currentStatsService.currentPokemon;
  localImages = this.localImageService.localImages;
  abilities = '';
  currentSpecies: SpeciesInfo;
  evolutionChain: EvolutionChainCall;
  evoChainClean: {
    species_name: string;
    min_level: number;
    trigger_name: string;
    item: string;
  }[] = [];

  constructor(
    public currentStatsService: CurrentStatsService,
    public localImageService: LocalImagesService,
    private webService: WebService,
    public router: Router
  ) {}

  convertAbilitiesToStr() {
    this.abilities = this.currentPokemon.abilities
      .map((user) => {
        return this.capitalizeStrings(user.ability.name);
      })
      .join(', ');
  }

  capitalizeStrings(string: string) {
    const capitalizedType = string.charAt(0).toUpperCase() + string.slice(1);
    return capitalizedType;
  }

  convertTypesArrtoString() {
    let individualPokemonTypes = this.currentPokemon.types.map((object) => {
      return this.capitalizeStrings(object.type.name);
    });
    return individualPokemonTypes.join(', ');
  }

  getSpeciesInfo(pokemonName: string) {
    this.webService.getSpeciesInfo(pokemonName).subscribe((resultObject) => {
      this.currentStatsService.setCurrentSpecies(resultObject);
      this.currentSpecies = resultObject;
      console.log(resultObject, 'species');
      this.getEvolutionChainInfo(resultObject.evolution_chain.url);
    });
  }

  getMatchingImage(pokemonName: string) {
    const matchedItem = this.localImages.filter((item) => {
      return item.pokemonName === pokemonName;
    });
    return matchedItem[0].image;
    //return matchedItem?.image;
  }

  getEvolutionChainInfo(url: string) {
    this.webService.getEvolutionChain(url).subscribe((resultObject) => {
      var evoData = resultObject.chain;
      do {
        var evoDetails = evoData['evolution_details'][0];

        this.evoChainClean.push({
          species_name: evoData.species.name,
          min_level: !evoDetails ? 1 : evoDetails.min_level,
          trigger_name: !evoDetails ? null : evoDetails.trigger.name,
          item: !evoDetails ? null : evoDetails.item,
        });
        evoData = evoData['evolves_to'][0];
      } while (!!evoData && evoData.hasOwnProperty('evolves_to'));
      console.log(this.evoChainClean, 'clean Evo Chain');
      this.evolutionChain = resultObject;
    });
    console.log(this.evoChainClean, 'evolution chain');
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    console.log(this.currentPokemon, 'from POKEMON STATS COMPONENT');
    this.convertAbilitiesToStr();
    this.getSpeciesInfo(this.currentPokemon.name);
  }
}
