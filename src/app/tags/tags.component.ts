import { LocalImagesService } from './../services/local-images.service';
import { LocalPokemonsService } from './../services/local-pokemons.service';
import { Component, OnInit } from '@angular/core';
import { WebService } from '../services/web.service';
import { Tag } from '../interfaces/tag';
import { GetPokemon } from '../interfaces/get-pokemon';
import { LocalImages } from '../interfaces/local-images';

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
  temporaryImages: LocalImages[];

  getTags() {
    this.webService.getAllTags().subscribe((resultObject) => {
      resultObject.results.forEach((tag) => {
        this.tags.push({ name: tag.name, url: tag.url, toggled: false });
      });
    });
  }

  convertTypesArrtoString() {
    this.localPokemonService.localPokemons.forEach((fullPokemon) => {
      let individualPokemonTypes = fullPokemon.types.map((object) => {
        return object.type.name;
      });
      fullPokemon.typesSimplified = individualPokemonTypes.toString();
    });
    console.log(this.localPokemonService.localPokemons);
    this.filterPokemons();
  }

  filterPokemons() {
    const localImages: LocalImages[] = [];
    const filtered = this.localPokemonService.localPokemons.filter(
      (fullPokemon) => {
        return fullPokemon.typesSimplified!.includes(this.activeTags[0]);
      }
    );

    filtered.forEach((fullPokemon) => {
      const id = fullPokemon.sprites.other.dream_world.front_default.replace(
        /[^0-9]/g,
        ''
      );
      localImages[parseInt(id) - 1] = {
        image: fullPokemon.sprites.other.dream_world.front_default,
        pokemonName: fullPokemon.name,
      };
    });

    if (this.activeTags.length > 0) {
      this.localPokemonService.setlocalPokemons(filtered);
      this.localImagesService.setlocalImages(localImages);
    } else {
      console.log("I'm at zero");

      this.localPokemonService.setlocalPokemons(this.temporaryPokemons);
      this.localImagesService.setlocalImages(this.temporaryImages);
    }
  }

  toggleTag(index: number) {
    if (this.temporaryPokemons.length === 0) {
      this.temporaryPokemons = this.localPokemonService.localPokemons.map(
        (object) => object
      );
      this.temporaryImages = this.localImagesService.localImages.map(
        (object) => object
      );
    }
    this.tags[index].toggled = !this.tags[index].toggled;
    // console.log(this.tags, 'toggled');
    this.tags[index].toggled
      ? this.activeTags.push(this.tags[index].name)
      : this.activeTags.splice(this.activeTags.indexOf(this.tags[index].name));

    this.convertTypesArrtoString();
    console.log(this.activeTags);
  }
  constructor(
    private webService: WebService,
    private localPokemonService: LocalPokemonsService,
    private localImagesService: LocalImagesService
  ) {}

  ngOnInit(): void {
    this.getTags();
  }
}
