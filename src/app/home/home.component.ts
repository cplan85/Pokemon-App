import { LocalImagesService } from './../services/local-images.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LocalPokemonsService } from '../services/local-pokemons.service';
import { GetPokemon } from '../interfaces/get-pokemon';
import { Validators } from '@angular/forms';
import { SearchService } from '../services/search.service';

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

  filter() {
    if (!this.hasFilterBegan) {
      this.temporaryPokemons = this.localPokemonService.localPokemons.map(
        (object) => object
      );
    }
    console.log(this.temporaryPokemons, 'tempory Pokemons');
    this.hasFilterBegan = true;

    let queryName = this.pokemonFinder.value['queryName'];
    queryName.length > 0
      ? (this.searchByName = true)
      : (this.searchByName = false);
    this.findByName(queryName);
    this.searchService.setSearchString(queryName);
  }

  findByName(nameValue: string) {
    this.localPokemons = this.localPokemonService.localPokemons;
    let filteredItem = this.localPokemonService.localPokemons.filter(
      (fullPokemon) =>
        fullPokemon.name.toLowerCase().includes(nameValue.toLowerCase())
    );

    this.localPokemons.splice(0, this.localPokemons.length);
    nameValue.length > 0
      ? this.localPokemons.push(...filteredItem)
      : this.localPokemons.push(...this.temporaryPokemons);

    this.localPokemonService.setlocalPokemons(this.localPokemons);
  }

  ngOnInit(): void {}
}
