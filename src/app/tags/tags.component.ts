import { LocalPokemonsService } from './../services/local-pokemons.service';
import { Component, OnInit } from '@angular/core';
import { WebService } from '../services/web.service';
import { Tag } from '../interfaces/tag';
import { GetPokemon } from '../interfaces/get-pokemon';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class TagsComponent implements OnInit {
  tags: Tag[] = [];
  activeTags: string[] = [];
  typesAsString: string[];
  temporaryPokemons: GetPokemon[] = [];

  constructor(
    private webService: WebService,
    public localPokemonService: LocalPokemonsService
  ) {}

  getTags() {
    if (this.localPokemonService.tags.length === 0) {
      this.webService.getAllTags().subscribe((resultObject) => {
        resultObject.results.forEach((tag) => {
          this.tags.push({ name: tag.name, url: tag.url, toggled: false });
        });
      });
    } else {
      this.tags = this.localPokemonService.tags;
    }

    this.localPokemonService.setTags(this.tags);
  }

  convertTypesArrtoString() {
    this.localPokemonService.localPokemons.forEach((fullPokemon) => {
      let individualPokemonTypes = fullPokemon.types.map((object) => {
        return object.type.name;
      });
      fullPokemon.typesSimplified = individualPokemonTypes.toString();
    });
    this.filterPokemons();
  }

  filterPokemons() {
    const booleanCheck = this.activeTags.join('|');
    const filtered = this.temporaryPokemons.filter((fullPokemon, id) => {
      return new RegExp(booleanCheck, 'ig').test(fullPokemon.typesSimplified!);
    });

    if (this.activeTags.length > 0) {
      this.localPokemonService.setlocalPokemons(filtered);
    } else {
      this.localPokemonService.setlocalPokemons(this.temporaryPokemons);
    }
  }

  duplicateArray(array: any[]) {
    return array.map((object) => object);
  }

  toggleTag(index: number) {
    if (this.temporaryPokemons.length === 0) {
      this.temporaryPokemons = this.duplicateArray(
        this.localPokemonService.localPokemons
      );
    }
    this.tags[index].toggled = !this.tags[index].toggled;
    this.tags[index].toggled
      ? this.activeTags.push(this.tags[index].name)
      : this.activeTags.splice(this.activeTags.indexOf(this.tags[index].name));

    this.convertTypesArrtoString();
  }

  ngOnInit(): void {
    this.getTags();
  }
}
