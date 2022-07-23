import { LocalImagesService } from './../services/local-images.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LocalPokemonsService } from '../services/local-pokemons.service';
import { GetPokemon } from '../interfaces/get-pokemon';
import { Validators } from '@angular/forms';
import { SearchService } from '../services/search.service';
import { LocalImages } from '../interfaces/local-images';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  pokemonFinder: FormGroup;
  searchByName = false;
  hasFilterBegan = false;
  queryName = '';
  localPokemons: GetPokemon[] = [];
  temporaryPokemons: GetPokemon[] = [];

  constructor(
    private _builder: FormBuilder,
    private localPokemonService: LocalPokemonsService,
    private localImagesService: LocalImagesService,
    private searchService: SearchService
  ) {
    this.pokemonFinder = this._builder.group({
      queryName: ['', Validators.required],
    });
  }

  duplicateArray(array: any[]) {
    return array.map((object) => object);
  }

  getFilteredImages(filtered: GetPokemon[]) {
    const localImages: LocalImages[] = [];
    const filteredCopy = this.duplicateArray(filtered);

    filteredCopy.forEach((fullPokemon) => {
      const imgURL = fullPokemon.sprites.other.dream_world.front_default;
      const fixedURL = imgURL.replace(
        'master/https://raw.githubusercontent.com/PokeAPI/sprites/',
        ''
      );
      const id = fullPokemon.sprites.other.dream_world.front_default.replace(
        /[^0-9]/g,
        ''
      );
      localImages[parseInt(id) - 1] = {
        image: fixedURL,
        pokemonName: fullPokemon.name,
      };
    });
    this.localImagesService.setlocalImages(localImages);
  }

  filter() {
    if (!this.hasFilterBegan) {
      this.temporaryPokemons = this.localPokemonService.localPokemons.map(
        (object) => object
      );
    }
    this.hasFilterBegan = true;

    let queryName = this.pokemonFinder.value['queryName'];
    queryName.length > 0
      ? (this.searchByName = true)
      : (this.searchByName = false);
    this.findByName(queryName);
    // this.getFilteredImages(this.localPokemonService.localPokemons);
    this.searchService.setSearchString(queryName);
  }

  findByName(nameValue: string) {
    this.localPokemons = this.localPokemonService.localPokemons;
    let filteredItem = this.temporaryPokemons.filter((fullPokemon) =>
      fullPokemon.name.toLowerCase().includes(nameValue.toLowerCase())
    );
    console.log('filteredItem', filteredItem);
    this.localPokemons.splice(0, this.localPokemons.length);
    nameValue.length > 0
      ? this.localPokemons.push(...filteredItem)
      : this.localPokemons.push(...this.temporaryPokemons);

    this.localPokemonService.setlocalPokemons(this.localPokemons);
    //this.getFilteredImages(this.duplicateArray(filteredItem));
  }

  ngOnInit(): void {}
}
