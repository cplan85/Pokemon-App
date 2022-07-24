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
    private searchService: SearchService
  ) {
    this.pokemonFinder = this._builder.group({
      queryName: ['', Validators.required],
    });
  }

  duplicateArray(array: any[]) {
    return array.map((object) => object);
  }

  filter() {
    if (!this.hasFilterBegan) {
      this.temporaryPokemons = this.duplicateArray(
        this.localPokemonService.localPokemons
      );
    }
    this.hasFilterBegan = true;

    let queryName = this.pokemonFinder.value['queryName'];
    queryName.length > 0
      ? (this.searchByName = true)
      : (this.searchByName = false);
    this.findByName(queryName);
    this.searchService.setSearchString(queryName);
  }

  findByName(nameValue: string) {
    const localImages: LocalImages[] = [];
    this.localPokemons = this.localPokemonService.localPokemons;
    let filteredItem = this.temporaryPokemons.filter((fullPokemon) =>
      fullPokemon.name.toLowerCase().includes(nameValue.toLowerCase())
    );

    if (nameValue.length > 0) {
      this.localPokemonService.setlocalPokemons(filteredItem);
    } else {
      this.localPokemonService.setlocalPokemons(this.temporaryPokemons);
    }
  }

  ngOnInit(): void {}
}
